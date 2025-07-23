import React from 'react';
import { ButtonProps } from './Button.typings';

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    onClick,
    variant = 'primary',
    icon_left,
    icon_right,
    disabled = false,
    className = '',
  } = props;

  const buttonClass = `app-button ${variant} ${className} ${icon_left || icon_right ? 'with-icon' : ''}`;
  
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {icon_left && <span className="button-icon">{icon_left}</span>}
      <span className="button-text">{children}</span>
      {icon_right && <span className="button-icon">{icon_right}</span>}
    </button>
  );
}; 