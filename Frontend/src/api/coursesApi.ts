import { ApiClient } from './api';
import { Course, Lecture, Module } from '../types/courses';

export class CoursesApi extends ApiClient {
  // Функция для обработки данных лекции
  private processLecture(lecture: any): Lecture {
    // Бекенд теперь возвращает правильные поля через Pydantic схему
    return {
      ...lecture
    };
  }

  // Функция для обработки данных курса
  private processCourse(course: any): Course {
    return {
      ...course,
      modules: course.modules?.map((module: any) => ({
        ...module,
        lectures: module.lectures?.map((lecture: any) => this.processLecture(lecture))
      })),
      lectures: course.lectures?.map((lecture: any) => this.processLecture(lecture))
    };
  }

  // Получить все курсы
  async getCourses(): Promise<Course[]> {
    const courses = await this.get<any[]>('/courses');
    return courses.map(course => this.processCourse(course));
  }

  // Получить курс по ID
  async getCourse(courseId: number): Promise<Course | null> {
    try {
      const course = await this.get<any>(`/courses/${courseId}`);
      return this.processCourse(course);
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  }

  // Получить все модули курса
  async getCourseModules(courseId: number): Promise<Module[]> {
    try {
      const course = await this.getCourse(courseId);
      return course?.modules || [];
    } catch (error) {
      console.error('Error fetching course modules:', error);
      return [];
    }
  }

  // Получить модуль по ID
  async getModule(courseId: number, moduleId: number): Promise<Module | null> {
    try {
      const course = await this.getCourse(courseId);
      return course?.modules?.find(m => m.id === moduleId) || null;
    } catch (error) {
      console.error('Error fetching module:', error);
      return null;
    }
  }

  // Получить все лекции модуля
  async getModuleLectures(courseId: number, moduleId: number): Promise<Lecture[]> {
    try {
      const module = await this.getModule(courseId, moduleId);
      return module?.lectures || [];
    } catch (error) {
      console.error('Error fetching module lectures:', error);
      return [];
    }
  }

  // Получить лекцию по ID
  async getLecture(courseId: number, lectureId: number): Promise<Lecture | null> {
    try {
      const course = await this.getCourse(courseId);
      if (!course) return null;
      
      for (const module of course.modules || []) {
        const lecture = module.lectures.find(l => l.id === lectureId);
        if (lecture) return lecture;
      }
      return null;
    } catch (error) {
      console.error('Error fetching lecture:', error);
      return null;
    }
  }

  // Получить следующую лекцию
  async getNextLecture(courseId: number, currentLectureId: number): Promise<Lecture | null> {
    try {
      const course = await this.getCourse(courseId);
      if (!course) return null;

    let found = false;
    for (const module of course.modules || []) {
      for (let i = 0; i < module.lectures.length; i++) {
          if (found) {
            return module.lectures[i];
        }
        if (module.lectures[i].id === currentLectureId) {
          found = true;
          if (i + 1 < module.lectures.length) {
              return module.lectures[i + 1];
          }
        }
      }
      if (found && course.modules) {
        const nextModuleIndex = course.modules.findIndex(m => m.id === module.id) + 1;
        if (nextModuleIndex < course.modules?.length) {
          const nextModule = course.modules[nextModuleIndex];
          if (nextModule.lectures.length > 0) {
              return nextModule.lectures[0];
            }
          }
        }
      }
      return null;
    } catch (error) {
      console.error('Error fetching next lecture:', error);
      return null;
    }
  }

  // Получить предыдущую лекцию
  async getPreviousLecture(courseId: number, currentLectureId: number): Promise<Lecture | null> {
    try {
      const course = await this.getCourse(courseId);
      if (!course) return null;

      let previousLecture: Lecture | null = null;
    for (const module of course.modules || []) {
        for (const lecture of module.lectures) {
          if (lecture.id === currentLectureId) {
            return previousLecture;
          }
          previousLecture = lecture;
        }
      }
      return null;
    } catch (error) {
      console.error('Error fetching previous lecture:', error);
      return null;
    }
  }

  // Поиск курсов
  async searchCourses(query: string): Promise<Course[]> {
    try {
      return await this.get<Course[]>(`/courses/search?q=${query}`);
    } catch (error) {
      console.error('Error searching courses:', error);
      return [];
    }
  }

  // Получить курсы по уровню
  async getCoursesByLevel(level: Course['level']): Promise<Course[]> {
    try {
      return await this.get<Course[]>(`/courses?level=${level}`);
    } catch (error) {
      console.error('Error fetching courses by level:', error);
      return [];
    }
  }

  // Получить курсы по тегам
  async getCoursesByTags(tags: string[]): Promise<Course[]> {
    try {
      const query = tags.map(tag => `tags=${tag}`).join('&');
      return await this.get<Course[]>(`/courses?${query}`);
    } catch (error) {
      console.error('Error fetching courses by tags:', error);
      return [];
    }
  }
} 