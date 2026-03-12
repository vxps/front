import React from 'react';
import { ChatItem } from './ChatItem';
import { mockChats } from '../../data/mockData';
import './ChatList.css';

interface ChatListProps {
  onChatSelect: (id: number) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  return (
    <div className="chat-list">
      {mockChats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} onSelect={onChatSelect} />
      ))}
    </div>
  );
};