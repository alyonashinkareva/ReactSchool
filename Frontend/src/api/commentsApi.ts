import { ApiClient } from './api';
import { Comment, Rating, RatingStats } from '../types/comments';

export interface CommentCreate {
  author: string;
  avatar?: string;
  text: string;
  date: string;
  lecture_id: number;
  course_id: number;
  user_id: number;
}

export class CommentsApi extends ApiClient {
  async getLectureComments(lectureId: number): Promise<Comment[]> {
    return this.get<Comment[]>(`/comments/lecture/${lectureId}`);
  }

  async addComment(data: CommentCreate): Promise<Comment> {
    return this.post<Comment>(`/comments`, data);
  }

  async getRatingStats(courseId: number, lectureId: string): Promise<RatingStats> {
    return this.get<RatingStats>(`/courses/${courseId}/lectures/${lectureId}/ratings/stats`);
  }

  async getUserRating(courseId: number, lectureId: string): Promise<Rating | null> {
    // Assuming the user ID is handled by the backend via session/token
    return this.get<Rating>(`/courses/${courseId}/lectures/${lectureId}/ratings/my-rating`);
  }

  async setRating(courseId: number, lectureId: string, like: boolean): Promise<void> {
    return this.post<void>(`/courses/${courseId}/lectures/${lectureId}/ratings`, { like });
  }

  async removeRating(courseId: number, lectureId: string): Promise<void> {
    return this.delete(`/courses/${courseId}/lectures/${lectureId}/ratings`);
  }
} 