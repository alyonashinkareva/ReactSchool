import { AuthApi } from './authApi';
import { CommentsApi } from './commentsApi';
import { CoursesApi } from './coursesApi';
import { ProgressApi } from './progressApi';
import { ReviewsApi } from './reviewsApi';

// Создаем экземпляры API клиентов
export const api = {
  auth: new AuthApi(),
  comments: new CommentsApi(),
  courses: new CoursesApi(),
  progress: new ProgressApi(),
  reviews: new ReviewsApi()
};

// Экспортируем типы
export * from '../types/auth';
export * from '../types/comments';
export * from '../types/courses';
export * from '../types/progress';
export * from '../types/reviews'; 