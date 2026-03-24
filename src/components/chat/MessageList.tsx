import React from 'react';
import { Message } from './Message';
import { ChatMessage } from '../../types';
import './MessageList.css';

interface MessageListProps {
  messages: ChatMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <Message 
          key={msg.id} 
          message={{
            id: msg.id,
            text: msg.content,
            sender: msg.role,
            time: formatTime(msg.timestamp),
          }} 
        />
      ))}
    </div>
  );
};