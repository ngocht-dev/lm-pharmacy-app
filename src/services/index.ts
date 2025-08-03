import { API_URL } from '@/constants/config';
import storageKeys from '@/constants/storageKeys';
import authServices from '@/modules/auth/services/auth.services';
import storage from '@/utils/storage';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axiosIntance = axios.create({
  baseURL: API_URL,
});

interface ReponseBase<T> {
  status: boolean;
  data?: T;
  statusCode?: number;
  message?: string;
}

enum ERROR_CODE {
  EXPRIED_ACCESS_TOKEN = 401,
  EXPRIED_REFRESH_TOKEN = 403,
  SIGNED_IN_ANOTHER_DEVICE = 409,
}

// Track if we're currently refreshing the token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: any = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

const cleanStorage = async () => {
  setGlobalAccessToken('');
  await storage.removeSecureItem(storageKeys.ACCESS_TOKEN);
  await storage.removeSecureItem(storageKeys.REFRESH_TOKEN);
  await storage.removeSecureItem(storageKeys.USER_ID);
};

const refreshToken = async (error: any) => {
  console.log('🔄 REFRESH TOKEN STARTED');
  try {
    // Get refresh token from storage
    const refreshToken = await storage.getSecureItem(storageKeys.REFRESH_TOKEN);
    console.log(
      '🔄 Refresh token from storage:',
      refreshToken ? 'exists' : 'not found'
    );

    if (!refreshToken) {
      console.log('🔄 No refresh token available, cleaning storage');
      await cleanStorage();
      return Promise.reject(error);
    }

    console.log('🔄 Calling auth/refresh endpoint');
    // Call refresh token endpoint
    const response = await authServices.refreshToken(refreshToken);
    console.log('🔄 Refresh response:', response);

    if (response.status && response.data) {
      const { access_token, refresh_token } = response.data;
      console.log('🔄 New tokens received, updating storage');

      // Update tokens in storage
      await storage.setSecureItem(storageKeys.ACCESS_TOKEN, access_token);
      await storage.setSecureItem(storageKeys.REFRESH_TOKEN, refresh_token);

      // Update global authorization header
      setGlobalAccessToken(access_token);
      console.log('🔄 Global token updated');

      // Retry the original request
      const originalRequest = error.config;
      if (originalRequest?.headers) {
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
      }
      console.log('🔄 Retrying original request');
      return axiosIntance(originalRequest!);
    } else {
      console.log('🔄 Refresh failed, cleaning storage');
      await cleanStorage();
      return Promise.reject(error);
    }
  } catch (error) {
    console.log('🔄 Refresh error:', error);
    await cleanStorage();
    return Promise.reject(error);
  }
};

axiosIntance.interceptors.response.use(
  (res) => {
    if (true) {
      console.log(
        JSON.stringify(
          {
            type: 'SUCCESS',
            url: res.config?.url,
            method: res.config?.method,
            httpStatus: res.status,
            data: res?.data,
          },
          null,
          2
        )
      );
    }
    return res;
  },
  async (error: AxiosError) => {
    console.log('🔍 INTERCEPTOR TRIGGERED:', {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
    });

    if (true) {
      console.log(
        JSON.stringify(
          {
            type: 'ERROR',
            url: `${error.config?.baseURL || ''}/${error.config?.url || ''}`,
            method: error.config?.method,
            httpStatus: error.status,
            statusText: error.response?.statusText,
            errorData: error.response?.data,
          },
          null,
          2
        )
      );
    }

    return new Promise((resolve, reject) => {
      const { status } = error.response || {};

      console.log('🔍 STATUS CHECK:', status);

      if (status) {
        switch (status) {
          case ERROR_CODE.EXPRIED_ACCESS_TOKEN:
            console.log('🔍 401 DETECTED - Starting refresh token flow');
            if (isRefreshing) {
              console.log('🔍 Already refreshing, queuing request');
              // If we're already refreshing, queue this request
              failedQueue.push({ resolve, reject });
            } else {
              console.log('🔍 Starting refresh token process');
              isRefreshing = true;
              refreshToken(error)
                .then((result) => {
                  console.log('🔍 Refresh successful, processing queue');
                  processQueue(null, result);
                  resolve(result);
                })
                .catch((refreshError) => {
                  console.log('🔍 Refresh failed:', refreshError);
                  processQueue(refreshError);
                  reject(refreshError);
                })
                .finally(() => {
                  console.log('🔍 Refresh process finished');
                  isRefreshing = false;
                });
            }
            break;
          case ERROR_CODE.EXPRIED_REFRESH_TOKEN:
          case ERROR_CODE.SIGNED_IN_ANOTHER_DEVICE:
            console.log('🔍 Critical auth error, cleaning storage');
            cleanStorage();
            reject(error);
            break;
          default:
            console.log('🔍 Other error, rejecting');
            reject(error);
        }
      } else {
        console.log('🔍 No status, rejecting');
        reject(error);
      }
    });
  }
);

export const setGlobalAccessToken = (token: string) =>
  (axiosIntance.defaults.headers.Authorization = `Bearer ${token}`);

export async function GET<T = undefined>(
  path: string,
  params?: any,
  options?: AxiosRequestConfig
): Promise<ReponseBase<T>> {
  try {
    const res = await axiosIntance.get<T>(path, { params, ...options });
    return {
      status: true,
      statusCode: res.status,
      data: res.data,
      message: undefined,
    };
  } catch (err: any) {
    // If it's a 401 error, let the interceptor handle it
    if (err.response?.status === ERROR_CODE.EXPRIED_ACCESS_TOKEN) {
      throw err; // Re-throw to let interceptor handle
    }

    const data = err.response?.data as any;
    return {
      status: false,
      statusCode: data?.statusCode,
      data: data.data as any,
      message: data.message,
    };
  }
}

export async function POST<T = undefined>(
  path: string,
  data?: any,
  options?: AxiosRequestConfig
): Promise<ReponseBase<T>> {
  try {
    const res = await axiosIntance.post<T>(path, data, options);
    return {
      status: true,
      statusCode: res.status,
      data: res.data,
      message: undefined,
    };
  } catch (err: any) {
    // If it's a 401 error, let the interceptor handle it
    if (err.response?.status === ERROR_CODE.EXPRIED_ACCESS_TOKEN) {
      throw err; // Re-throw to let interceptor handle
    }

    const data = err.response?.data as any;
    return {
      status: false,
      statusCode: data?.statusCode || err.response?.status,
      data: data?.data as any,
      message: data?.message,
    };
  }
}

export async function PUT<T = undefined>(
  path: string,
  data?: any,
  options?: AxiosRequestConfig
): Promise<ReponseBase<T>> {
  try {
    const res = await axiosIntance.put<ReponseBase<T>>(path, data, options);
    return {
      status: true,
      statusCode: res.data.statusCode,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (err: any) {
    // If it's a 401 error, let the interceptor handle it
    if (err.response?.status === ERROR_CODE.EXPRIED_ACCESS_TOKEN) {
      throw err; // Re-throw to let interceptor handle
    }

    const data = err.response?.data as any;
    return {
      status: false,
      statusCode: data?.statusCode,
      data: data?.data as any,
      message: data?.message,
    };
  }
}

export async function DELETE<T = undefined>(
  path: string,
  options?: AxiosRequestConfig
): Promise<ReponseBase<T>> {
  try {
    const res = await axiosIntance.delete<ReponseBase<T>>(path, options);
    return {
      status: true,
      statusCode: res.data.statusCode,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (err: any) {
    // If it's a 401 error, let the interceptor handle it
    if (err.response?.status === ERROR_CODE.EXPRIED_ACCESS_TOKEN) {
      throw err; // Re-throw to let interceptor handle
    }

    const data = err.response?.data as any;
    return {
      status: false,
      statusCode: data?.statusCode,
      data: data?.data as any,
      message: data?.message,
    };
  }
}

export default axiosIntance;
