// Типы для модулей курса
export interface Module {
  id: number;
  title: string;
  description: string;
  order: number;
  lectures: Lecture[];
}

// Типы для лекций
export interface Lecture {
  id: number;
  title: string;
  number: number;
  content?: string;
  videoUrl?: string;
  teachers: Teacher[];
  tags?: string[];
  presentationSlides?: string[]; // Массив URL слайдов презентации
}

// Типы для вложений
export interface Attachment {
  id: string;
  title: string;
  type: 'pdf' | 'code' | 'link';
  url: string;
}

// Типы для курсов
export interface Course {
  id: number;
  title: string;
  description: string;
  cover: string;
  is_available: boolean;
  duration: number;
  is_popular: boolean;
  background_color: string;
  // Эти поля могут быть не в каждом курсе, если они приходят с другого эндпоинта
  modules?: Module[];
  tags?: string[];
  requirements?: string[];
  price?: number;
  discount?: number;
  createdAt?: string;
  updatedAt?: string;
  lectures?: Lecture[];
  level?: 'beginner' | 'intermediate' | 'advanced';
  author?: string;
  authorId?: string;
  progress?: number;
}

export interface Teacher {
  id: string;
  name: string;
  photo: string;
  role: string;
  description?: string;
}

export interface TeacherCourseWithLectures {
  course_id: number;
  course_title: string;
  course_description: string;
  lectures: {
    id: number;
    title: string;
    number: number;
  }[];
} 