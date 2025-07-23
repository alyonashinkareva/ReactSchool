import { ApiClient } from './api';

export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  message: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export class AuthApi extends ApiClient {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      return await this.post<AuthResponse>('/register', data);
    } catch (error: any) {
      // Обрабатываем ошибки сервера
      if (error.message.includes('400')) {
        throw new Error('Email already registered');
      }
      throw error;
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      return await this.post<AuthResponse>('/login', data);
    } catch (error: any) {
      // Обрабатываем ошибки сервера
      if (error.message.includes('401')) {
        throw new Error('Invalid email or password');
      }
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    // This assumes the backend verifies the user via a token sent in the headers.
    // The actual token handling logic (sending it with each request) would typically
    // be managed in the ApiClient or a request interceptor.
    try {
      return await this.get<User>('/auth/me');
    } catch (error) {
      return null;
    }
  }

  async logout(): Promise<void> {
    // Depending on the backend, this might post to an endpoint to invalidate a token.
    try {
      await this.post<void>('/auth/logout', {});
    } catch (error) {
      // Игнорируем ошибки logout
      console.warn('Logout error:', error);
    }
  }
} 