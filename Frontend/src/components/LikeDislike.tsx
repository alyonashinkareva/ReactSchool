import React from 'react';
import '../styles/LikeDislike.css';

interface LikeDislikeProps {
  likes: number;
  userRating: boolean | null;
  isAuthenticated: boolean;
  onLike: () => void;
  onDislike: () => void;
  onAuthPrompt: () => void;
}

// Функция для красивого форматирования чисел
const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    const thousands = num / 1000;
    return thousands % 1 === 0 
      ? `${Math.floor(thousands)}K`
      : `${thousands.toFixed(1)}K`;
  } else if (num < 1000000000) {
    const millions = num / 1000000;
    return millions % 1 === 0 
      ? `${Math.floor(millions)}M`
      : `${millions.toFixed(1)}M`;
  } else {
    const billions = num / 1000000000;
    return billions % 1 === 0 
      ? `${Math.floor(billions)}B`
      : `${billions.toFixed(1)}B`;
  }
};

const LikeDislike: React.FC<LikeDislikeProps> = ({
  likes,
  userRating,
  isAuthenticated,
  onLike,
  onDislike,
  onAuthPrompt
}) => {
  const handleLike = () => {
    if (!isAuthenticated) {
      onAuthPrompt();
      return;
    }
    onLike();
  };

  const handleDislike = () => {
    if (!isAuthenticated) {
      onAuthPrompt();
      return;
    }
    onDislike();
  };

  return (
    <div className="like-dislike-container">
      <div className="rating-buttons">
        <button
          className={`like-button ${userRating === true ? 'active' : ''}`}
          onClick={handleLike}
          aria-label="Нравится"
        >
          <svg
            className="like-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 12H5.25C4.65326 12 4.08097 12.2371 3.65901 12.659C3.23705 13.081 3 13.6533 3 14.25V18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75V14.25C21 13.6533 20.7629 13.081 20.341 12.659C19.919 12.2371 19.3467 12 18.75 12H16.5M7.5 12V6.75C7.5 5.95435 7.81607 5.19129 8.37868 4.62868C8.94129 4.06607 9.70435 3.75 10.5 3.75H12.5625L13.5 7.5L7.5 12Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {likes > 0 && <span className="rating-count">{formatNumber(likes)}</span>}
        </button>
        
        <button
          className={`dislike-button ${userRating === false ? 'active' : ''}`}
          onClick={handleDislike}
          aria-label="Не нравится"
        >
          <svg
            className="dislike-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 12H18.75C19.3467 12 19.919 11.7629 20.341 11.341C20.7629 10.919 21 10.3467 21 9.75V5.25C21 4.65326 20.7629 4.08097 20.341 3.65901C19.919 3.23705 19.3467 3 18.75 3H5.25C4.65326 3 4.08097 3.23705 3.65901 3.65901C3.23705 4.08097 3 4.65326 3 5.25V9.75C3 10.3467 3.23705 10.919 3.65901 11.341C4.08097 11.7629 4.65326 12 5.25 12H7.5M16.5 12V17.25C16.5 18.0456 16.1839 18.8087 15.6213 19.3713C15.0587 19.9339 14.2956 20.25 13.5 20.25H11.4375L10.5 16.5L16.5 12Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LikeDislike; 