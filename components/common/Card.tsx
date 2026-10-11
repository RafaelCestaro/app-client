import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  // FIX: Added optional onClick prop to make the Card component clickable.
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div onClick={onClick} className={`bg-white dark:bg-loco-gray rounded-xl shadow-lg p-4 md:p-6 ${className}`}>
      {children}
    </div>
  );
};
