import React from 'react';
import { Message } from './Message';
import { mockMessages } from '../../data/mockData';
import './MessageList.css';

export const MessageList: React.FC = () => {
  return (
    <div className="message-list">
      {mockMessages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
};