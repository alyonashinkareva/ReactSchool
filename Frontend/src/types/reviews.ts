export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  course?: string;
  userId?: string;
}

export interface ReviewCreate {
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  course_id: number;
  user_id: number;
  date: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: number[]; // [1-star, 2-star, 3-star, 4-star, 5-star]
} 