import React, { useState, useRef, useCallback } from 'react';
import styles from './InputArea.module.css';

interface InputAreaProps {
  onSend: (text: string) => void;
  isLoading: boolean;
  onStop?: () => void;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading, onStop }) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmedValue = value.trim();
      if (trimmedValue && !isLoading) {
        onSend(trimmedValue);
        setValue('');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    }
  }, [value, isLoading, onSend]);

  const handleSend = useCallback(() => {
    const trimmedValue = value.trim();
    if (trimmedValue && !isLoading) {
      onSend(trimmedValue);
      setValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [value, isLoading, onSend]);

  const handleStop = useCallback(() => {
    if (onStop) {
      onStop();
    }
  }, [onStop]);

  return (
    <div className={styles.inputArea}>
      <div className={styles.inputWrapper}>
        <button 
          className={styles.attachBtn} 
          title="Прикрепить изображение" 
          disabled={isLoading}
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a1 1 0 1 1-2 0V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0V4H6a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4z"/>
          </svg>
        </button>
        
        <textarea
          ref={textareaRef}
          className={styles.inputTextarea}
          placeholder="Введите сообщение..."
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isLoading}
        />
        
        {isLoading ? (
          <button 
            className={styles.stopButton}
            onClick={handleStop}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <rect x="3" y="3" width="12" height="12" rx="2"/>
            </svg>
            Стоп
          </button>
        ) : (
          <button 
            className={styles.sendButton}
            onClick={handleSend}
            disabled={!value.trim()}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M15.51 8.26a.75.75 0 0 1 0 1.48l-13 4.5a.75.75 0 0 1-.74-1.23l3.98-3.76-3.98-3.76a.75.75 0 0 1 .74-1.23l13 4.5z"/>
            </svg>
            Отправить
          </button>
        )}
      </div>
    </div>
  );
};