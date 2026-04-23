import React, { useCallback } from 'react';
import { ChatList } from './ChatList';
import { SearchInput } from './SearchInput';
import { useChatStore } from '../../store/chatStore';
import styles from './Sidebar.module.css';

interface SidebarProps {
  onNewChat: () => void;
  onSearch: (query: string) => void;
  onChatSelect: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewChat, onSearch, onChatSelect }) => {
  const { chats, activeChatId, deleteChat } = useChatStore();

  const handleDeleteChat = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Вы уверены, что хотите удалить этот чат?')) {
      deleteChat(id);
    }
  }, [deleteChat]);

  const handleSelect = useCallback((id: string) => {
    onChatSelect(id);
  }, [onChatSelect]);

  return (
    <div className={styles.sidebarContent}>
      <button className={styles.newChatBtn} onClick={onNewChat}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z"/>
        </svg>
        Новый чат
      </button>
      
      <div className={styles.searchContainer}>
        <SearchInput onSearch={onSearch} />
      </div>
      
      <div className={styles.chatListContainer}>
        <ChatList 
          chats={chats}
          activeChatId={activeChatId}
          onSelect={handleSelect}
          onDelete={handleDeleteChat}
        />
      </div>
    </div>
  );
};