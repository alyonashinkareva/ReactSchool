export interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
  avatar?: string;
  lecture_id: number;
  course_id: number;
  user_id: number;
}

export interface Rating {
  userId: string;
  lectureId: string;
  courseId: number;
  like: boolean;
  date: string;
}

export interface RatingStats {
  likes: number;
  dislikes: number;
} 