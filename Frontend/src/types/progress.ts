export interface LectureProgress {
  lectureId: string;
  completed: boolean;
  lastVisited: string;
  timeSpent: number;
}

export interface CourseProgress {
  userId: string;
  courseId: number;
  completedLectures: string[];
  lastWatchedLecture: string;
  overallProgress: number;
  lastPosition: number;
  lastUpdated: string;
}

export interface LectureHistory {
  lectureId: string;
  watchedDuration: number;
  totalDuration: number;
  completed: boolean;
  lastPosition: number;
  lastUpdated?: string;
} 