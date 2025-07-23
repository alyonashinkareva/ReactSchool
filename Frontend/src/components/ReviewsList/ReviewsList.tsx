import React, { useState, useEffect } from 'react';
import { Review, ReviewStats } from '../../types/reviews';
import { ReviewsApi } from '../../api/reviewsApi';
import StarRating from '../StarRating';
import './ReviewsList.css';

interface ReviewsListProps {
  courseId: number;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ courseId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reviewsApi = new ReviewsApi();

  useEffect(() => {
    loadReviews();
  }, [courseId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const [reviewsData, statsData] = await Promise.all([
        reviewsApi.getReviewsForCourse(courseId),
        reviewsApi.getCourseRatingStats(courseId)
      ]);
      setReviews(reviewsData);
      setStats(statsData);
    } catch (err) {
      setError('Ошибка при загрузке отзывов');
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="reviews-loading">Загрузка отзывов...</div>;
  }

  if (error) {
    return <div className="reviews-error">{error}</div>;
  }

  return (
    <div className="reviews-list">
      <div className="reviews-header">
        <h3>Отзывы о курсе</h3>
        {stats && (
          <div className="reviews-stats">
            <div className="average-rating">
                             <StarRating rating={stats.averageRating} readonly />
              <span className="rating-text">
                {stats.averageRating} из 5 ({stats.totalReviews} отзывов)
              </span>
            </div>
            <div className="rating-distribution">
              {stats.ratingDistribution.slice().reverse().map((count: number, index: number) => (
                <div key={index} className="rating-bar">
                  <span className="star-count">{5 - index} ★</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: stats.totalReviews > 0 ? `${(count / stats.totalReviews) * 100}%` : '0%' 
                      }}
                    ></div>
                  </div>
                  <span className="count">({count})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="reviews-content">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <p>Пока нет отзывов о данном курсе</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="author-info">
                  {review.avatar && (
                    <img src={review.avatar} alt={review.author} className="author-avatar" />
                  )}
                  <div>
                    <div className="author-name">{review.author}</div>
                    <div className="review-date">{new Date(review.date).toLocaleDateString('ru-RU')}</div>
                  </div>
                </div>
                                 <StarRating rating={review.rating} readonly />
              </div>
              <div className="review-text">{review.text}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsList; 