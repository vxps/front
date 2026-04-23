import React, { lazy, Suspense } from 'react';

const MessageListInner = lazy(() => import('./MessageListInner'));

interface MessageListProps {
  messages: {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
  }[];
}

export const MessageList: React.FC<MessageListProps> = (props) => {
  return (
    <Suspense fallback={<div className="loading-spinner">Загрузка сообщений...</div>}>
      <MessageListInner {...props} />
    </Suspense>
  );
};