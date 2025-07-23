import React from 'react';
import reactLogo from './assets/react.svg';

export const ReactSchool: React.FC = () => {
  return (
    <div className="react-school">
      <div className="react-logo">
        <img src={reactLogo} alt="React Logo" className="react-logo-img" />
      </div>
      <div className="school-name">
        <span className="school-name-react">React</span>
        <span className="school-name-school">School</span>
      </div>
    </div>
  );
};