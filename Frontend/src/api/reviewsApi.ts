import { ApiClient } from './api';
import { Review, ReviewCreate, ReviewStats } from '../types/reviews';

export class ReviewsApi extends ApiClient {
  async getReviews(courseId?: number): Promise<Review[]> {
    const endpoint = courseId ? `/reviews?course_id=${courseId}` : '/reviews';
    return this.get<Review[]>(endpoint);
  }

  async getReviewsForCourse(courseId: number): Promise<Review[]> {
    return this.get<Review[]>(`/reviews?course_id=${courseId}`);
  }

  async getCourseRatingStats(courseId: number): Promise<ReviewStats> {
    return this.get<ReviewStats>(`/reviews/course/${courseId}/stats`);
  }

  async addReview(review: ReviewCreate): Promise<Review> {
    return this.post<Review>('/reviews', review);
  }

  async deleteReview(reviewId: string): Promise<void> {
    return this.delete(`/reviews/${reviewId}`);
  }

  // Deprecated - use getCourseRatingStats instead
  async getAvailableCourses(): Promise<string[]> {
    console.warn('getAvailableCourses from reviewsApi is deprecated.');
    return Promise.resolve([]);
  }
} 