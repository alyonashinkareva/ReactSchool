import React from 'react';
import '../styles/StarRating.css';

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onChange, readonly = false }) => {
  const handleStarClick = (newRating: number) => {
    if (!readonly && onChange) {
      // Если пользователь кликает на уже выбранную звезду, сбрасываем рейтинг
      onChange(rating === newRating ? 0 : newRating);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span 
          key={star} 
          className={`star ${star <= rating ? 'filled' : ''} ${!readonly ? 'clickable' : ''}`}
          onClick={() => handleStarClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating; 