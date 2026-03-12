import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-message">
      <svg className="error-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm1 11H7V9h2v2zm0-3H7V4h2v4z"/>
      </svg>
      <span>{message}</span>
    </div>
  );
};