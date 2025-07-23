import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ITeacherCardProps } from './TeacherCard.typings';

export const TeacherCard: React.FC<ITeacherCardProps> = (props) => {
  const { name, role, photo, description, id } = props;
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/teachers/${id}`);
  };

  return (
    <div className="teacher-card" onClick={handleClick}>
      <div className="card-header">
        <div className="teacher-photo">
          <img src={photo} alt={name} />
        </div>
        <div className="photo-overlay"></div>
      </div>
      
      <div className="teacher-info">
        <span className="teacher-role">{role}</span>
        <h3 className="teacher-name">{name}</h3>
        <p className="teacher-description">{description}</p>
        <div className="teacher-profile-link">
          <span className="profile-text">Подробнее</span>
          <span className="profile-arrow">→</span>
        </div>
      </div>
    </div>
  );
};
