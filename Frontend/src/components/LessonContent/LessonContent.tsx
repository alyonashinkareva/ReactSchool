import React from 'react';
import { LessonContentProps } from './LessonContent.typings';

export const LessonContent: React.FC<LessonContentProps> = ({ children }) => {
  return (
    <main className="lesson-content">
      <div className="lesson-container">
        {children}
      </div>
    </main>
  );
};
