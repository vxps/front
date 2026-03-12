import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message as MessageType } from '../../types';
import './Message.css';

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const [showCopy, setShowCopy] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
  };

  return (
    <div 
      className={`message ${isUser ? 'message-user' : 'message-assistant'}`}
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      {!isUser && (
        <div className="message-avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      )}
      
      <div className="message-content">
        <div className="message-header">
          <span className="message-sender">
            {isUser ? 'Вы' : 'GigaChat'}
          </span>
          <span className="message-time">{message.time}</span>
        </div>
        
        <div className="message-text">
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      </div>
      
      {!isUser && showCopy && (
        <button className="message-copy-btn" onClick={handleCopy}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 1.5a.5.5 0 0 1 .5.5v1h8a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 13.5 15h-9A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h.5V2a.5.5 0 0 1 .5-.5zm.5 2.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-9z"/>
          </svg>
        </button>
      )}
    </div>
  );
};