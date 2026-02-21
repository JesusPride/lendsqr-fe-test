import React from 'react';
import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  className = '',
}) => {
  return (
    <div className={`loading-spinner loading-spinner-${size} loading-spinner-${color} ${className}`}>
      <div className="spinner-circle"></div>
    </div>
  );
};

export default LoadingSpinner;
