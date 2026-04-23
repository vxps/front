import React, { useEffect, useRef } from 'react';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import { TypingIndicator } from './TypingIndicator';
import { ErrorBoundary } from '../error/ErrorBoundary';
import { useChatStore } from '../../store/chatStore';
import { Message } from '../../types';
import styles from './ChatWindow.module.css';

interface ChatWindowProps {
  onOpenSettings: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onOpenSettings }) => {
  const { 
    activeChatId, 
    getActiveChat, 
    addMessage, 
    updateMessage, 
    setLoading, 
    isLoading
  } = useChatStore();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chat = getActiveChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!activeChatId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    addMessage(activeChatId, userMessage);
    setLoading(true);

    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };
    addMessage(activeChatId, assistantMessage);

    try {
      const credentials = localStorage.getItem('credentials');
      const response = await fetchGigaChatResponse(
        chat?.messages || [],
        userMessage,
        credentials || ''
      );
      
      updateMessage(activeChatId, assistantMessageId, response);
    } catch (err: any) {
      console.error('API Error:', err);
      updateMessage(activeChatId, assistantMessageId, `Ошибка: ${err.message || 'Не удалось получить ответ'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStopGeneration = () => {
    setLoading(false);
  };

  return (
    <div className={styles.chatWindow}>
      <header className={styles.chatHeader}>
        <div className={styles.chatHeaderInfo}>
          <h1 className={styles.chatTitle}>{chat?.title || 'Чат'}</h1>
        </div>
        <button className={styles.settingsBtn} onClick={onOpenSettings}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM10 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
          </svg>
        </button>
      </header>
      
      <div className={styles.messagesContainer}>
        {chat ? (
          <ErrorBoundary fallback={<div className={styles.errorFallback}>Ошибка загрузки сообщений</div>}>
            <MessageList messages={chat.messages} />
          </ErrorBoundary>
        ) : (
          <div className={styles.emptyState}>
            <h2>Выберите или создайте чат</h2>
            <p>Нажмите «Новый чат» чтобы начать диалог</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className={styles.typingContainer}>
        <TypingIndicator isVisible={isLoading} />
      </div>
      
      <div className={styles.inputContainer}>
        <InputArea 
          onSend={handleSendMessage} 
          isLoading={isLoading}
          onStop={handleStopGeneration}
        />
      </div>
    </div>
  );
};

async function fetchGigaChatResponse(
  messages: Message[],
  newUserMessage: Message,
  credentials: string
): Promise<string> {
  if (!credentials) {
    return 'Ошибка: credentials не найдены. Войдите в приложение и введите ключ авторизации.';
  }

  try {
    const tokenResponse = await fetch('http://localhost:3001/api/oauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': credentials,
        'RqUID': generateRqUID(),
      },
      body: 'scope=GIGACHAT_API_PERS',
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json().catch(() => ({}));
      throw new Error(`Token error: ${tokenResponse.status} - ${errorData.error || 'Unknown'}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const chatResponse = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({
        model: 'GigaChat',
        messages: [
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: newUserMessage.role, content: newUserMessage.content }
        ],
        stream: false,
      }),
    });

    if (!chatResponse.ok) {
      const errorData = await chatResponse.json().catch(() => ({}));
      throw new Error(`Chat error: ${chatResponse.status} - ${errorData.error || 'Unknown'}`);
    }

    const data = await chatResponse.json();
    return data.choices[0].message.content;

  } catch (error: any) {
    console.error('GigaChat API Error:', error);
    throw error;
  }
}

function generateRqUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}