import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import './InputArea.css';

interface InputAreaProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading }) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    autoResize();
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (value.trim() && !isLoading) {
      onSend(value);
      setValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="input-area">
      <div className="input-wrapper">
        <button className="attach-btn" title="Прикрепить изображение" disabled={isLoading}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a1 1 0 1 1-2 0V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0V4H6a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4z"/>
          </svg>
        </button>
        
        <textarea
          ref={textareaRef}
          className="input-textarea"
          placeholder="Введите сообщение..."
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isLoading}
        />
        
        <Button 
          variant="primary" 
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path d="M15.51 8.26a.75.75 0 0 1 0 1.48l-13 4.5a.75.75 0 0 1-.74-1.23l3.98-3.76-3.98-3.76a.75.75 0 0 1 .74-1.23l13 4.5z"/>
          </svg>
        </Button>
        
        <Button 
          variant="secondary" 
          className="stop-btn" 
          disabled={!isLoading}
        >
          Стоп
        </Button>
      </div>
    </div>
  );
};