import { CoursesApi } from '../api/coursesApi';
import { Course, Lecture, Module } from '../types/courses';

class CoursesService {
  private api: CoursesApi;

  constructor() {
    this.api = new CoursesApi();
  }

  // Get all courses
  async getCourses(): Promise<Course[]> {
    return this.api.getCourses();
  }

  // Get featured courses
  async getFeaturedCourses(limit: number = 5): Promise<Course[]> {
    try {
      const allCourses = await this.getCourses();
      return allCourses.filter(course => course.is_popular).slice(0, limit);
    } catch (error) {
      console.error('Error getting featured courses:', error);
      return [];
    }
  }

  // Get course by ID
  async getCourse(courseId: number): Promise<Course | null> {
    return this.api.getCourse(courseId);
  }

  // Get course modules
  async getCourseModules(courseId: number): Promise<Module[]> {
    return this.api.getCourseModules(courseId);
  }

  // Get module by ID
  async getModule(courseId: number, moduleId: number): Promise<Module | null> {
    return this.api.getModule(courseId, moduleId);
  }

  // Get module lectures
  async getModuleLectures(courseId: number, moduleId: number): Promise<Lecture[]> {
    return this.api.getModuleLectures(courseId, moduleId);
  }

  // Get lecture by ID
  async getLecture(courseId: number, lectureId: number): Promise<Lecture | null> {
    return this.api.getLecture(courseId, lectureId);
  }

  // Get next lecture
  async getNextLecture(courseId: number, currentLectureId: number): Promise<Lecture | null> {
    return this.api.getNextLecture(courseId, currentLectureId);
  }

  // Get previous lecture
  async getPreviousLecture(courseId: number, currentLectureId: number): Promise<Lecture | null> {
    return this.api.getPreviousLecture(courseId, currentLectureId);
  }

  // Search courses
  async searchCourses(query: string): Promise<Course[]> {
    return this.api.searchCourses(query);
  }

  // Get courses by level
  async getCoursesByLevel(level: Course['level']): Promise<Course[]> {
    return this.api.getCoursesByLevel(level);
  }

  // Get courses by tags
  async getCoursesByTags(tags: string[]): Promise<Course[]> {
    return this.api.getCoursesByTags(tags);
  }
}

export const coursesService = new CoursesService(); 