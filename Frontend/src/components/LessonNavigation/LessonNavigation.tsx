import React from 'react';
import Button from '../Button';
import { LessonNavigationProps } from './LessonNavigation.typings';

export const LessonNavigation: React.FC<LessonNavigationProps> = (props) => {
  const { prevLesson, nextLesson } = props;
  
  const handlePrevClick = () => {
    if (prevLesson?.url) {
      window.location.href = prevLesson.url;
    }
  };

  const handleNextClick = () => {
    if (nextLesson?.url) {
      window.location.href = nextLesson.url;
    }
  };

  return (
    <div className="lesson-navigation">
      {prevLesson ? (
        <Button 
          variant="secondary" 
          onClick={handlePrevClick}
          icon_left={<span className="nav-arrow prev-arrow">←</span>}
          className="nav-button prev-button"
        >
          {prevLesson.title}
        </Button>
      ) : (
        <div className="lesson-nav-placeholder"></div>
      )}
      
      {nextLesson && (
        <Button 
          variant="secondary"
          onClick={handleNextClick}
          className="nav-button next-button"
          icon_right={<span className="nav-arrow next-arrow">→</span>}
        >
          {nextLesson.title}
        </Button>
      )}
    </div>
  );
};
