import React from 'react';
import './TeacherProfile-ProfileHeader.css';

interface ProfileHeaderProps {
  name: string;
  photo: string;
  role: string;
  location?: string;
}

export const TeacherProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  photo,
  role,
  location
}) => {
  return (
    <div className="profile-header">
      <div className="profile-avatar">
        <img src={photo} alt={name} />
      </div>
      <div className="profile-info">
        <h1 className="profile-name">{name}</h1>
        <div className="profile-role">{role}</div>
        <div className="profile-location">
          {location || "Saint-Petersburg, Russia"}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileHeader; 