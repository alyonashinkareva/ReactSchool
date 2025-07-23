import React from 'react';
import { Link } from 'react-router-dom';
import { ICourseCardProps } from './CourseCard.typings';
import './CourseCard.css';

const CourseCard: React.FC<ICourseCardProps> = ({ 
  // id,
  title, 
  // description,
  cover, 
  // progress = 10,
  url, 
  isAvailable = true,
  duration,
  isPopular = false,
  backgroundColor = '#e6f2ea' // светло-зеленый по умолчанию
}) => {
  return (
    <Link to={url} className="course-card" style={{ backgroundColor }}>
      <div className="course-card__container">
        <div className="course-card__header">
          <div className="course-card__title-section">
            <span className="course-card__subtitle">Профессия</span>
            {isPopular && (
              <div className="course-card__popular-tag">
                <span className="course-card__popular-text">Популярное</span>
                <span className="course-card__popular-flash"></span>
              </div>
            )}
          </div>
          <h2 className="course-card__title">{title}</h2>
        </div>

        {duration && (
          <div className="course-card__duration">
            <span className="course-card__duration-number">{duration}</span> месяцев
          </div>
        )}

        {/* {progress > 0 && (
            <div className="course-card__progress-container">
              <div className="course-card__progress">
                <div className="course-card__progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="course-card__progress-text">{progress}%</span>
            </div>
          )} */}
        
        <div className="course-card__image-container">
          <img src={cover} alt={title} className="course-card__image" />
        </div>
        
        {!isAvailable && (
          <div className="course-card__badge">
            <span>Скоро</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard; 