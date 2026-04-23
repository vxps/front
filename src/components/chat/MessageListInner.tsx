import React from 'react';
import { Message } from './Message';
import styles from './MessageList.module.css';

interface MessageListInnerProps {
  messages: {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
  }[];
}

export const MessageListInner: React.FC<MessageListInnerProps> = ({ messages }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={styles.messageList}>
      {messages.map((msg) => (
        <Message 
          key={msg.id} 
          message={{
            id: msg.id,
            text: msg.content,
            sender: msg.role === 'system' ? 'assistant' : (msg.role as 'user' | 'assistant'),
            time: formatTime(msg.timestamp),
          }} 
        />
      ))}
    </div>
  );
};
export default MessageListInner;