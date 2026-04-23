import React from 'react';
import { ChatItem } from './ChatItem';
import { Chat } from '../../types';
import styles from './ChatList.module.css';

interface ChatListProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, activeChatId, onSelect, onDelete }) => {
  return (
    <div className={styles.chatList}>
      {chats.map((chat) => (
        <ChatItem 
          key={chat.id} 
          chat={chat}
          isActive={chat.id === activeChatId}
          onSelect={() => onSelect(chat.id)}
          onDelete={(e) => onDelete(chat.id, e)}
        />
      ))}
    </div>
  );
};