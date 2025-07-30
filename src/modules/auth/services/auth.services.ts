import { POST } from '@/services';

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

class AuthServices {
  login(credentials: LoginCredentials) {
    return POST<LoginResponse>('auth/login', credentials);
  }

  logout() {
    return POST('auth/logout');
  }
}

export default new AuthServices();
