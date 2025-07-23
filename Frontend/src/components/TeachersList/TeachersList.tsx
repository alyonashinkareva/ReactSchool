import React from 'react';
import TeacherCard from '../TeacherCard';
import { TeachersListProps } from './TeachersList.typings';

export const TeachersList: React.FC<TeachersListProps> = (props) => {
  const { teachers, title } = props;

  return (
    <section className="teachers-section">
      <h2 className="teachers-title">{title}</h2>
      <div className="teachers-grid">
        {teachers.map((teacher, index) => (
          <TeacherCard 
            key={index}
            {...teacher}
          />
        ))}
      </div>
    </section>
  );
};

export default TeachersList; 