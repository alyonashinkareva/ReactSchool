import { ProgressApi } from '../api/progressApi';
import { CourseProgress, LectureHistory } from '../types/progress';
import { QuizResult } from '../types/quiz';

// Utility function to convert string user ID to number
function getUserIdAsNumber(userId: string): number {
  // Если userId пустой или null, возвращаем 1 как fallback
  if (!userId || userId === '') {
    console.warn('Empty user ID, using default user ID: 1');
    return 1;
  }

  // Парсим как целое число
  const numericId = parseInt(userId, 10);
  if (!isNaN(numericId) && numericId > 0) {
    return numericId;
  }
  
  // Если не получилось парсить как целое число, выводим предупреждение и возвращаем 1 как fallback
  console.warn(`Invalid user ID format: ${userId}, expected integer. Using default user ID: 1`);
  return 1;
}

class ProgressService {
  private api: ProgressApi;

  constructor() {
    this.api = new ProgressApi();
  }

  async getCourseProgress(courseId: number, userId: string): Promise<CourseProgress | null> {
    try {
      // If user is not authenticated, return null progress
      if (!userId || userId === '') {
        console.log('User not authenticated, returning null progress');
        return null;
      }
      
      return await this.api.getCourseProgress(courseId, getUserIdAsNumber(userId));
    } catch (error) {
      console.error('Error getting course progress:', error);
      return null;
    }
  }

  async updateProgress(courseId: number, lectureId: string, userId: string): Promise<void> {
    try {
      // If user is not authenticated, skip progress update
      if (!userId || userId === '') {
        console.log('User not authenticated, skipping progress update');
        return;
      }
      
      // Получаем текущий прогресс для обновления списка пройденных лекций
      const currentProgress = await this.getCourseProgress(courseId, userId);
      const completedLectures = currentProgress?.completedLectures || [];
      
      // Добавляем лекцию если её ещё нет в списке пройденных
      if (!completedLectures.includes(lectureId)) {
        completedLectures.push(lectureId);
      }

      // Подсчитываем общий прогресс как процент от общего количества лекций
      // Для этого нам нужно знать общее количество лекций в курсе
      // Пока будем считать прогресс исходя из завершенных лекций
      const overallProgress = Math.min(100, Math.round((completedLectures.length / Math.max(completedLectures.length, 10)) * 100));

      await this.api.updateProgress(courseId, getUserIdAsNumber(userId), {
        completedLectures,
        lastWatchedLecture: lectureId,
        overallProgress,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }

  // Новый метод для обновления прогресса с общим количеством лекций
  async updateProgressWithTotal(courseId: number, lectureId: string, userId: string, totalLectures: number): Promise<void> {
    try {
      // If user is not authenticated, skip progress update
      if (!userId || userId === '') {
        console.log('User not authenticated, skipping progress update');
        return;
      }
      
      // Получаем текущий прогресс для обновления списка пройденных лекций
      const currentProgress = await this.getCourseProgress(courseId, userId);
      const completedLectures = currentProgress?.completedLectures || [];
      
      // Добавляем лекцию если её ещё нет в списке пройденных
      if (!completedLectures.includes(lectureId)) {
        completedLectures.push(lectureId);
      }

      // Правильно подсчитываем общий прогресс
      const overallProgress = Math.min(100, Math.round((completedLectures.length / totalLectures) * 100));

      await this.api.updateProgress(courseId, getUserIdAsNumber(userId), {
        completedLectures,
        lastWatchedLecture: lectureId,
        overallProgress,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }

  async getUserProgress(userId: string): Promise<CourseProgress[]> {
    try {
      // If user is not authenticated, return empty array
      if (!userId || userId === '') {
        console.log('User not authenticated, returning empty progress array');
        return [];
      }
      
      return await this.api.getUserProgress(getUserIdAsNumber(userId));
    } catch (error) {
      console.error('Error getting user progress:', error);
      return [];
    }
  }

  async resetProgress(courseId: number, userId: string): Promise<void> {
    try {
      // If user is not authenticated, skip reset
      if (!userId || userId === '') {
        console.log('User not authenticated, skipping progress reset');
        return;
      }
      
      await this.api.resetProgress(courseId, getUserIdAsNumber(userId));
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  }

  async isLectureCompleted(courseId: number, lectureId: string, userId: string): Promise<boolean> {
    // If user is not authenticated, return false
    if (!userId || userId === '') {
      return false;
    }
    
    const progress = await this.getCourseProgress(courseId, userId);
    return progress?.completedLectures?.includes(lectureId) || false;
  }

  async getLectureHistory(lectureId: string, userId: string): Promise<LectureHistory | null> {
    try {
      // If user is not authenticated, return null
      if (!userId || userId === '') {
        console.log('User not authenticated, returning null lecture history');
        return null;
      }
      
      return await this.api.getLectureHistory(lectureId, getUserIdAsNumber(userId));
    } catch (error) {
      console.error('Error getting lecture history:', error);
      return null;
    }
  }

  async updateLectureHistory(lectureId: string, userId: string, historyData: Partial<LectureHistory>): Promise<LectureHistory | null> {
    try {
      // If user is not authenticated, skip update
      if (!userId || userId === '') {
        console.log('User not authenticated, skipping lecture history update');
        return null;
      }
      
      return await this.api.updateLectureHistory(lectureId, getUserIdAsNumber(userId), historyData);
    } catch (error) {
      console.error('Error updating lecture history:', error);
      return null;
    }
  }

  async updateLectureProgress(lectureId: string, userId: string, watchedDuration: number, totalDuration: number): Promise<void> {
    try {
      // If user is not authenticated, skip update
      if (!userId || userId === '') {
        console.log('User not authenticated, skipping lecture progress update');
        return;
      }
      
      const updatedHistory: Partial<LectureHistory> = {
        watchedDuration,
        totalDuration,
        completed: watchedDuration >= totalDuration * 0.9,
        lastPosition: Math.floor(watchedDuration)
      };
      await this.updateLectureHistory(lectureId, userId, updatedHistory);
    } catch (error) {
      console.error('Error updating lecture progress:', error);
    }
  }

  async getLastPosition(lectureId: string, userId: string): Promise<number> {
    // If user is not authenticated, return 0
    if (!userId || userId === '') {
      return 0;
    }
    
    const history = await this.getLectureHistory(lectureId, userId);
    return history?.lastPosition || 0;
  }

  async saveQuizResult(quizResult: QuizResult, userId: string): Promise<void> {
    try {
      // If user is not authenticated, skip saving
      if (!userId || userId === '') {
        console.log('User not authenticated, skipping quiz result save');
        return;
      }
      
      // Сохраняем результат квиза в localStorage
      const quizKey = `quiz_${quizResult.courseId}_${quizResult.lectureId}_${getUserIdAsNumber(userId)}`;
      localStorage.setItem(quizKey, JSON.stringify(quizResult));
      
      // Также обновляем прогресс курса
      await this.api.updateProgress(quizResult.courseId, getUserIdAsNumber(userId), {
        completedLectures: [quizResult.lectureId.toString()],
        lastWatchedLecture: quizResult.lectureId.toString(),
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  }

  async getQuizResult(courseId: number, lectureId: number, userId: string): Promise<QuizResult | null> {
    try {
      // If user is not authenticated, return null
      if (!userId || userId === '') {
        return null;
      }
      
      // Получаем результат квиза из localStorage
      const quizKey = `quiz_${courseId}_${lectureId}_${getUserIdAsNumber(userId)}`;
      const savedResult = localStorage.getItem(quizKey);
      
      if (savedResult) {
        return JSON.parse(savedResult) as QuizResult;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting quiz result:', error);
      return null;
    }
  }

  // Новый метод для получения всех статусов квизов для курса
  async getCourseQuizStatuses(courseId: number, lectureIds: string[], userId: string): Promise<Array<{lectureId: string, isCompleted: boolean, score?: number}>> {
    if (!userId || userId === '') {
      return lectureIds.map(id => ({ lectureId: id, isCompleted: false }));
    }

    const statuses = [];
    for (const lectureId of lectureIds) {
      const quizResult = await this.getQuizResult(courseId, parseInt(lectureId), userId);
      statuses.push({
        lectureId,
        isCompleted: quizResult?.completed || false,
        score: quizResult?.score
      });
    }
    
    return statuses;
  }

  // Новый метод для проверки, завершен ли квиз для конкретной лекции
  async isQuizCompleted(courseId: number, lectureId: string, userId: string): Promise<boolean> {
    if (!userId || userId === '') {
      return false;
    }
    
    const quizResult = await this.getQuizResult(courseId, parseInt(lectureId), userId);
    return quizResult?.completed || false;
  }
}

export default new ProgressService(); 