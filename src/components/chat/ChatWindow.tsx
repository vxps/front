import React, { useState, useRef, useEffect } from 'react';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import { TypingIndicator } from './TypingIndicator';
import { ChatMessage } from '../../types';
import './ChatWindow.css';

interface ChatWindowProps {
  onOpenSettings: () => void;
}

// Моковые ответы ассистента
const mockResponses = [
  "Отличный вопрос! Давайте разберемся.",
  "Я понял вашу задачу. Вот что я думаю...",
  "Интересно! Позвольте мне помочь вам с этим.",
  "Хорошо, вот мое решение:\n```python\ndef solution():\n    return 'Результат'\n```",
  "Спасибо за сообщение! Я обрабатываю ваш запрос.",
];

export const ChatWindow: React.FC<ChatWindowProps> = ({ onOpenSettings }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      content: '**Здравствуйте!** Чем могу помочь?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Автоскролл к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = (text: string) => {
    // Добавляем сообщение пользователя
    const userMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="chat-window">
      <header className="chat-header">
        <div className="chat-header-info">
          <h1 className="chat-title">Помощь с кодом на Python #1234</h1>
        </div>
        <button className="settings-btn" onClick={onOpenSettings}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM10 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
          </svg>
        </button>
      </header>
      
      <MessageList messages={messages} />
      
      <TypingIndicator isVisible={isLoading} />
      
      <div ref={messagesEndRef} />
      
      <InputArea onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};