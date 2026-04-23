import React from 'react';
import { Chat } from '../../types';
import styles from './ChatItem.module.css';

interface ChatItemProps {
  chat: Chat;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const ChatItem = React.memo<ChatItemProps>(({ chat, isActive, onSelect, onDelete }) => {
  const formatLastMessage = (messages: Chat['messages']) => {
    if (messages.length === 0) return 'Нет сообщений';
    const last = messages[messages.length - 1];
    return last.content.substring(0, 30) + (last.content.length > 30 ? '...' : '');
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Вчера';
    } else if (days < 7) {
      return date.toLocaleDateString('ru-RU', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' });
    }
  };

  const handleClick = () => {
    onSelect(chat.id);
  };

  return (
    <div 
      className={`${styles.chatItem} ${isActive ? styles.chatItemActive : ''}`}
      onClick={handleClick}
    >
      <div className={styles.chatItemContent}>
        <div className={styles.chatItemTitle}>{chat.title}</div>
        <div className={styles.chatItemMeta}>
          <span className={styles.chatItemLastMessage}>
            {formatLastMessage(chat.messages)}
          </span>
          <span className={styles.chatItemDate}>{formatDate(chat.updatedAt)}</span>
        </div>
      </div>
      
      <button 
        className={styles.chatItemDeleteBtn} 
        onClick={onDelete}
        title="Удалить чат"
        type="button"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        </svg>
      </button>
    </div>
  );
});

ChatItem.displayName = 'ChatItem';