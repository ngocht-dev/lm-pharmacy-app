import { GET, POST } from '@/services';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user?: {
    id: string;
    username: string;
    email: string;
    // Add other user fields as needed
  };
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  refresh_token: string;
  access_token: string; // Changed from token to access_token to match API
}

export interface UserInfo {
  id: number;
  username: string;
  role: string;
}

class AuthServices {
  login(credentials: LoginCredentials) {
    return POST<LoginResponse>('auth/login', credentials);
  }

  refreshToken(refreshToken: string) {
    const payload: RefreshTokenRequest = {
      refresh_token: refreshToken,
    };
    return POST<RefreshTokenResponse>('auth/refresh', payload);
  }

  logout() {
    return POST('auth/logout');
  }

  getMe() {
    return GET<UserInfo>('auth/me');
  }
}

export default new AuthServices();
