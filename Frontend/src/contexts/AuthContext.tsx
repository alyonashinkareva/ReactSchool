import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { User } from '../services/authService';

// Интерфейс для значения контекста авторизации
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<User>;
  register: (username: string, password: string) => Promise<User>;
  logout: () => void;
  loading: boolean;
}

// Создаем контекст с начальным значением
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Пропсы для провайдера
interface AuthProviderProps {
  children: ReactNode;
}

// Провайдер контекста
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // При инициализации проверяем, авторизован ли пользователь
  useEffect(() => {
    const initAuth = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    initAuth();
  }, []);

  // Функция для входа
  const login = async (username: string, password: string): Promise<User> => {
    try {
      const loggedInUser = await authService.login(username, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      throw error;
    }
  };

  // Функция для регистрации
  const register = async (username: string, password: string): Promise<User> => {
    try {
      const registeredUser = await authService.register(username, password);
      setUser(registeredUser);
      return registeredUser;
    } catch (error) {
      throw error;
    }
  };

  // Функция для выхода
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Значение контекста, которое будет доступно компонентам
  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Хук для использования контекста авторизации
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  
  return context;
};

export default AuthContext; 