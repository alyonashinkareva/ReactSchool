import React, { useState } from 'react';
import { ReviewCreate } from '../../types/reviews';
import { ReviewsApi } from '../../api/reviewsApi';
import StarRating from '../StarRating';
import './AddReviewForm.css';

interface AddReviewFormProps {
  courseId: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  onReviewAdded: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ 
  courseId, 
  userId, 
  userName, 
  userAvatar,
  onReviewAdded 
}) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reviewsApi = new ReviewsApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Пожалуйста, поставьте оценку');
      return;
    }
    
    if (text.trim().length < 10) {
      setError('Отзыв должен содержать не менее 10 символов');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const reviewData: ReviewCreate = {
        author: userName,
        avatar: userAvatar,
        rating,
        text: text.trim(),
        course_id: courseId,
        user_id: userId,
        date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
      };

      await reviewsApi.addReview(reviewData);
      
      // Сброс формы
      setRating(0);
      setText('');
      
      // Уведомление родительского компонента
      onReviewAdded();
      
    } catch (err) {
      setError('Ошибка при добавлении отзыва. Попробуйте еще раз.');
      console.error('Error adding review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setError(null);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setError(null);
  };

  return (
    <div className="add-review-form">
      <h4>Оставить отзыв</h4>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ваша оценка:</label>
          <StarRating 
            rating={rating} 
            onChange={handleRatingChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="review-text">Ваш отзыв:</label>
          <textarea
            id="review-text"
            value={text}
            onChange={handleTextChange}
            placeholder="Поделитесь своими впечатлениями о курсе..."
            rows={4}
            maxLength={1000}
            disabled={isSubmitting}
          />
          <div className="char-counter">
            {text.length}/1000 символов (минимум 10)
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting || rating === 0 || text.trim().length < 10}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm; 