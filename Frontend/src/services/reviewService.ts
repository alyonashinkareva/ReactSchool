import { User } from './authService';

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  course?: string;
  userId?: string;
}

// Ключ для localStorage
const REVIEWS_KEY = 'react_school_reviews';

// Сервис для работы с отзывами
const reviewService = {
  // Получить все отзывы
  getReviews(): Review[] {
    const reviewsData = localStorage.getItem(REVIEWS_KEY);
    if (!reviewsData) return [];
    
    return JSON.parse(reviewsData);
  },

  // Добавить отзыв
  addReview(user: User, text: string, rating: number, course: string): Review {
    const review: Review = {
      id: `review_${Date.now()}`,
      author: user.username,
      avatar: user.avatar || 'https://avatars.mds.yandex.net/get-yapic/31804/0r-9/islands-middle',
      rating,
      date: new Date().toLocaleDateString(),
      text,
      course,
      userId: user.id
    };

    const reviews = this.getReviews();
    const updatedReviews = [review, ...reviews];
    
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(updatedReviews));
    
    return review;
  },

  // Удалить отзыв
  deleteReview(reviewId: string): void {
    const reviews = this.getReviews();
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(updatedReviews));
  },

  // Проверить, может ли пользователь удалить отзыв
  canDeleteReview(review: Review, userId?: string): boolean {
    return !!userId && review.userId === userId;
  },

  // Получить отзывы для конкретного курса
  getReviewsForCourse(course: string): Review[] {
    const reviews = this.getReviews();
    return reviews.filter(review => review.course === course);
  },

  // Получить все доступные курсы из отзывов
  getAvailableCourses(): string[] {
    const reviews = this.getReviews();
    const coursesSet = new Set<string>();
    
    reviews.forEach(review => {
      if (review.course) {
        coursesSet.add(review.course);
      }
    });
    
    return Array.from(coursesSet);
  }
};

export default reviewService; 