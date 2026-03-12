import React from 'react';
import { ChatList } from './ChatList';
import { SearchInput } from './SearchInput';
import './Sidebar.css';

interface SidebarProps {
  onNewChat: () => void;
  onSearch: (query: string) => void;
  onChatSelect: (id: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewChat, onSearch, onChatSelect }) => {
  return (
    <div className="sidebar-content">
      <button className="new-chat-btn" onClick={onNewChat}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z"/>
        </svg>
        Новый чат
      </button>
      
      <SearchInput onSearch={onSearch} />
      
      <ChatList onChatSelect={onChatSelect} />
    </div>
  );
};