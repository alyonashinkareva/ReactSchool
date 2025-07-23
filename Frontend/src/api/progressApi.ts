import { ApiClient } from './api';
import { CourseProgress, LectureHistory } from '../types/progress';

export class ProgressApi extends ApiClient {
  async getCourseProgress(courseId: number, userId: number): Promise<CourseProgress | null> {
    return this.get<CourseProgress>(`/progress/courses/${courseId}?user_id=${userId}`);
  }

  async getUserProgress(userId: number): Promise<CourseProgress[]> {
    return this.get<CourseProgress[]>(`/progress/my-progress?user_id=${userId}`);
  }

  async updateProgress(courseId: number, userId: number, progressData: Partial<CourseProgress>): Promise<CourseProgress> {
    return this.put<CourseProgress>(`/progress/courses/${courseId}?user_id=${userId}`, progressData);
  }

  async getLectureHistory(lectureId: string, userId: number): Promise<LectureHistory | null> {
    return this.get<LectureHistory>(`/progress/lectures/${lectureId}?user_id=${userId}`);
  }

  async updateLectureHistory(lectureId: string, userId: number, historyData: Partial<LectureHistory>): Promise<LectureHistory> {
    return this.put<LectureHistory>(`/progress/lectures/${lectureId}?user_id=${userId}`, historyData);
  }

  async resetProgress(courseId: number, userId: number): Promise<void> {
    return this.delete(`/progress/courses/${courseId}?user_id=${userId}`);
  }
} 