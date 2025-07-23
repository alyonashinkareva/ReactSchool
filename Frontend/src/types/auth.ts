export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
} 