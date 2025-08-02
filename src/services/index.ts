import { API_URL } from '@/constants/config';
import storageKeys from '@/constants/storageKeys';
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
}

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
  async (err: AxiosError) => {
    if (true) {
      console.log(
        JSON.stringify(
          {
            type: 'ERROR',
            url: `${err.config?.baseURL || ''}/${err.config?.url || ''}`,
            method: err.config?.method,
            httpStatus: err.status,
            statusText: err.response?.statusText,
            errorData: err.response?.data,
          },
          null,
          2
        )
      );
    }
    if (err.response?.status === ERROR_CODE.EXPRIED_ACCESS_TOKEN) {
      setGlobalAccessToken('');
      storage.setSecureItem(storageKeys.ACCESS_TOKEN, '');
      storage.setSecureItem(storageKeys.REFRESH_TOKEN, '');
    }
    return Promise.reject(err);
  }
);

export const setGlobalAccessToken = (token: string) =>
  (axiosIntance.defaults.headers.Authorization = `Bearer ${token}`);

export async function GET<T = undefined>(
  path: string,
  params?: any,
  options?: AxiosRequestConfig
): Promise<ReponseBase<T>> {
  return axiosIntance
    .get<T>(path, { params, ...options })
    .then((res) => ({
      status: true,
      statusCode: res.status,
      data: res.data,
      message: undefined,
    }))
    .catch((err: AxiosError) => {
      const data = err.response?.data as any;
      return {
        status: false,
        statusCode: data?.statusCode,
        data: data.data as any,
        message: data.message,
      };
    });
}

export async function POST<T = undefined>(
  path: string,
  data?: any,
  options?: AxiosRequestConfig
): Promise<ReponseBase<T>> {
  return axiosIntance
    .post<T>(path, data, options)
    .then((res) => ({
      status: true,
      statusCode: res.status,
      data: res.data, // The actual data is directly in res.data
      message: undefined,
    }))
    .catch((err: AxiosError) => {
      const data = err.response?.data as any;
      return {
        status: false,
        statusCode: data?.statusCode || err.response?.status,
        data: data?.data as any,
        message: data?.message,
      };
    });
}

export async function PUT<T = undefined>(
  path: string,
  data?: any,
  options?: AxiosRequestConfig
): Promise<ReponseBase<T>> {
  return axiosIntance
    .put<ReponseBase<T>>(path, data, options)
    .then((res) => ({
      status: true,
      statusCode: res.data.statusCode,
      data: res.data.data,
      message: res.data.message,
    }))
    .catch((err: AxiosError) => {
      const data = err.response?.data as any;
      return {
        status: false,
        statusCode: data?.statusCode,
        data: data?.data as any,
        message: data?.message,
      };
    });
}

export async function DELETE<T = undefined>(
  path: string,
  options?: AxiosRequestConfig
): Promise<ReponseBase<T>> {
  return axiosIntance
    .delete<ReponseBase<T>>(path, options)
    .then((res) => ({
      status: true,
      statusCode: res.data.statusCode,
      data: res.data.data,
      message: res.data.message,
    }))
    .catch((err: AxiosError) => {
      const data = err.response?.data as any;
      return {
        status: false,
        statusCode: data?.statusCode,
        data: data?.data as any,
        message: data?.message,
      };
    });
}

export default axiosIntance;
