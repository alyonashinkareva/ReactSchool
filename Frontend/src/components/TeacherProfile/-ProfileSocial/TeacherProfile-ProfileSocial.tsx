import React from 'react';
import './TeacherProfile-ProfileSocial.css';

interface ProfileSocialProps {
  email?: string;
  telegram?: string;
  phone?: string;
  github?: string;
}

export const TeacherProfileSocial: React.FC<ProfileSocialProps> = ({
  email,
  telegram,
  phone,
  github
}) => {
  return (
    <div className="profile-social">
      <h2>Контакты</h2>
      <div className="social-links">
        {email && (
          <div className="social-item">
            <span className="social-icon">📨</span>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        )}
        {telegram && (
          <div className="social-item">
            <span className="social-icon">✈️</span>
            <a href={telegram} target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
          </div>
        )}
        {phone && (
          <div className="social-item">
            <span className="social-icon">☎️</span>
            <a className="contact-detail" href={`tel:${phone}`}>{phone}</a>
          </div>
        )}
        {github && (
          <div className="social-item">
            <span className="social-icon">🛜</span>
            <a href={github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfileSocial; 