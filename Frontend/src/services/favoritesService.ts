import { ratingService } from './commentService';
import { CoursesApi } from '../api/coursesApi';
import { Lecture } from '../types/courses';

export interface FavoriteLecture extends Lecture {
  courseId: number;
  courseTitle: string;
  likedDate: string;
}

export class FavoritesService {
  private coursesApi = new CoursesApi();

  // Получить все лайкнутые лекции пользователя
  async getFavoriteLectures(userId: string): Promise<FavoriteLecture[]> {
    const ratingsData = localStorage.getItem('react_school_ratings');
    if (!ratingsData) return [];

    const allRatings = JSON.parse(ratingsData);
    const userLikes = allRatings.filter(
      (rating: any) => rating.userId === userId && rating.like === true
    );

    const favoriteLectures: FavoriteLecture[] = [];

    // Получаем все курсы
    const courses = await this.coursesApi.getCourses();

    for (const like of userLikes) {
      // Найти курс по ID
      const course = courses.find(c => c.id.toString() === like.courseId);
      if (!course) continue;

      // Найти лекцию в курсе
      for (const module of course.modules || []) {
        const lecture = module.lectures.find(l => l.id.toString() === like.lectureId);
        if (lecture) {
          favoriteLectures.push({
            ...lecture,
            courseId: course.id,
            courseTitle: course.title,
            likedDate: like.date
          });
          break;
        }
      }
    }

    // Сортируем по дате лайка (новые сначала)
    return favoriteLectures.sort((a, b) => 
      new Date(b.likedDate).getTime() - new Date(a.likedDate).getTime()
    );
  }

  // Проверить, является ли лекция избранной
  isLectureFavorite(courseId: string, lectureId: string, userId: string): boolean {
    const rating = ratingService.getUserRating(courseId, lectureId, userId);
    return rating?.like === true;
  }

  // Получить количество избранных лекций
  getFavoritesCount(userId: string): number {
    const ratingsData = localStorage.getItem('react_school_ratings');
    if (!ratingsData) return 0;

    const allRatings = JSON.parse(ratingsData);
    return allRatings.filter(
      (rating: any) => rating.userId === userId && rating.like === true
    ).length;
  }
}

export const favoritesService = new FavoritesService(); 