import React from 'react';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import { TypingIndicator } from './TypingIndicator';
import './ChatWindow.css';

interface ChatWindowProps {
  onSendMessage: (text: string) => void;
  onOpenSettings: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onSendMessage, onOpenSettings }) => {
  return (
    <div className="chat-window">
      <header className="chat-header">
        <div className="chat-header-info">
          <h1 className="chat-title">Помощь с кодом на Python #1234</h1>
        </div>
        <button className="settings-btn" onClick={onOpenSettings}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM10 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
          </svg>
        </button>
      </header>
      
      <MessageList />
      
      <TypingIndicator isVisible={false} />
      
      <InputArea onSend={onSendMessage} />
    </div>
  );
};