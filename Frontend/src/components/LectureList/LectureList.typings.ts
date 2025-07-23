export interface ILecture {
  id: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
  duration?: string;
  icon?: string;
}

interface Teacher {
  id: string;
  name: string;
  photo: string;
}

interface Rating {
  value: number;
  count: number;
}

export interface Lecture {
  id: string;
  title: string;
  number: number;
  teachers: Teacher[];
  rating?: Rating;
  tags?: string[];
}

// Информация о статусе квиза для лекции
export interface QuizStatus {
  lectureId: string;
  isCompleted: boolean;
  score?: number; // процент правильных ответов
}

export interface ILectureListProps {
  courseId: number;
  courseTitle: string;
  lectures: Lecture[];
  quizStatuses?: QuizStatus[]; // статусы квизов для лекций
  completedLectureIds?: string[]; // ID завершенных лекций
} 