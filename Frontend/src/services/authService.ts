import { AuthApi, RegisterData } from '../api/authApi';

// Интерфейс пользователя (для совместимости сохраняем string ID)
export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
}

// Интерфейс для хранения данных авторизации
export interface AuthData {
  user: User | null;
  token: string | null;
}

// Имя ключей в localStorage
const AUTH_KEY = 'react_school_auth';
const USERS_KEY = 'react_school_users';

// Создаем экземпляр API
const authApi = new AuthApi();

// Предустановленные пользователи для тестирования (fallback если backend недоступен)
const DEFAULT_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@reactschool.com',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/31804/0r-9/islands-middle'
  },
  {
    id: '2', 
    username: 'test',
    email: 'test@reactschool.com',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/31804/0r-9/islands-middle'
  },
  {
    id: '3',
    username: 'demo',
    email: 'demo@reactschool.com',
    avatar: 'https://avatars.mds.yandex.net/get-yapic/31804/0r-9/islands-middle'
  }
];

// Сервис для работы с авторизацией
const authService = {
  // Получить следующий доступный ID для нового пользователя
  getNextUserId(): string {
    const users = this.getAllUsers();
    const numericIds = users
      .map(user => parseInt(user.id, 10))
      .filter(id => !isNaN(id) && id > 0);
    
    if (numericIds.length === 0) {
      return '1';
    }
    
    const maxId = Math.max(...numericIds);
    return (maxId + 1).toString();
  },

  // Получить список всех зарегистрированных пользователей
  getAllUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);
    if (!users) {
      // Если пользователей нет, создаем предустановленных
      this.saveUsers(DEFAULT_USERS);
      return DEFAULT_USERS;
    }
    return JSON.parse(users);
  },

  // Сохранить список пользователей
  saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  // Получить текущие данные авторизации
  getAuthData(): AuthData {
    const authData = localStorage.getItem(AUTH_KEY);
    return authData ? JSON.parse(authData) : { user: null, token: null };
  },

  // Проверка авторизован ли пользователь
  isAuthenticated(): boolean {
    const { token } = this.getAuthData();
    return !!token;
  },

  // Получить текущего пользователя
  getCurrentUser(): User | null {
    return this.getAuthData().user;
  },

  // Найти пользователя по имени
  findUserByUsername(username: string): User | null {
    const users = this.getAllUsers();
    return users.find(user => user.username === username) || null;
  },

  // Авторизация (логин)
  async login(emailOrUsername: string, password: string): Promise<User> {
    try {
      if (!emailOrUsername || password.length < 4) {
        throw new Error('Неверное имя пользователя/email или пароль');
      }

      // Сначала пытаемся авторизоваться через backend API
      let response;
      try {
        // Пробуем войти как email
        response = await authApi.login({ email: emailOrUsername, password });
      } catch (apiError) {
        // Если не получилось - пробуем найти пользователя по username в локальном хранилище
        const localUser = this.findUserByUsername(emailOrUsername);
        if (localUser && localUser.email) {
          response = await authApi.login({ email: localUser.email, password });
        } else {
          throw apiError;
        }
      }

      // Конвертируем backend user в наш формат
      const user: User = {
        id: response.user.id.toString(),
        username: response.user.username,
        email: response.user.email,
        avatar: response.user.avatar || 'https://avatars.mds.yandex.net/get-yapic/31804/0r-9/islands-middle'
      };

      // Сохраняем авторизацию
      const token = `token_${Math.random().toString(36).substr(2)}`;
      localStorage.setItem(AUTH_KEY, JSON.stringify({ user, token }));
      
      // Сохраняем пользователя в локальный список для быстрого поиска
      this.updateLocalUserList(user);

      return user;
    } catch (error) {
      // Fallback на локальную авторизацию если backend недоступен
      console.warn('Backend login failed, falling back to local auth:', error);
      return this.loginLocal(emailOrUsername, password);
    }
  },

  // Локальная авторизация (fallback)
  async loginLocal(username: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!username || password.length < 4) {
          reject(new Error('Неверное имя пользователя или пароль'));
          return;
        }

        // Ищем пользователя в списке зарегистрированных
        const existingUser = this.findUserByUsername(username);
        
        if (existingUser) {
          // Пользователь найден, авторизуем его
          const token = `token_${Math.random().toString(36).substr(2)}`;
          localStorage.setItem(AUTH_KEY, JSON.stringify({ user: existingUser, token }));
          resolve(existingUser);
        } else {
          reject(new Error('Пользователь не найден. Проверьте имя пользователя или зарегистрируйтесь.'));
        }
      }, 500);
    });
  },

  // Регистрация
  async register(username: string, password: string): Promise<User> {
    try {
      if (!username || password.length < 4) {
        throw new Error('Имя пользователя и пароль должны быть не менее 4 символов');
      }

      // Создаем email на основе username
      const email = `${username}@reactschool.local`;

      // Регистрируем через backend API
      const registerData: RegisterData = {
        username,
        email,
        password
      };

      const response = await authApi.register(registerData);

      // Конвертируем backend user в наш формат
      const user: User = {
        id: response.user.id.toString(),
        username: response.user.username,
        email: response.user.email,
        avatar: response.user.avatar || 'https://avatars.mds.yandex.net/get-yapic/31804/0r-9/islands-middle'
      };

      // Сохраняем авторизацию
      const token = `token_${Math.random().toString(36).substr(2)}`;
      localStorage.setItem(AUTH_KEY, JSON.stringify({ user, token }));
      
      // Сохраняем пользователя в локальный список
      this.updateLocalUserList(user);

      return user;
    } catch (error: any) {
      // Fallback на локальную регистрацию если backend недоступен
      console.warn('Backend registration failed, falling back to local registration:', error);
      
      // Проверяем специфические ошибки backend
      if (error.message && error.message.includes('Email already registered')) {
        throw new Error('Пользователь с таким именем уже существует');
      }
      
      return this.registerLocal(username, password);
    }
  },

  // Локальная регистрация (fallback)
  async registerLocal(username: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!username || password.length < 4) {
          reject(new Error('Имя пользователя и пароль должны быть не менее 4 символов'));
          return;
        }

        // Проверяем, не существует ли уже такой пользователь
        const existingUser = this.findUserByUsername(username);
        if (existingUser) {
          reject(new Error('Пользователь с таким именем уже существует'));
          return;
        }

        // Создаем нового пользователя
        const newUser: User = {
          id: this.getNextUserId(),
          username,
          email: `${username}@reactschool.local`,
          avatar: 'https://avatars.mds.yandex.net/get-yapic/31804/0r-9/islands-middle'
        };
        
        // Добавляем в список пользователей
        const users = this.getAllUsers();
        users.push(newUser);
        this.saveUsers(users);

        // Авторизуем нового пользователя
        const token = `token_${Math.random().toString(36).substr(2)}`;
        localStorage.setItem(AUTH_KEY, JSON.stringify({ user: newUser, token }));
        
        resolve(newUser);
      }, 500);
    });
  },

  // Обновить локальный список пользователей
  updateLocalUserList(user: User): void {
    const users = this.getAllUsers();
    const existingIndex = users.findIndex(u => u.id === user.id || u.username === user.username);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    this.saveUsers(users);
  },

  // Выход из аккаунта
  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  }
};

export default authService; 