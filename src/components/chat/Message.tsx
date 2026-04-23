import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MessageDisplay } from '../../types';
import styles from './Message.module.css';

interface MessageProps {
  message: MessageDisplay;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`${styles.message} ${isUser ? styles.messageUser : styles.messageAssistant}`}>
      {!isUser && (
        <div className={styles.messageAvatar}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      )}
      
      <div className={styles.messageContent}>
        <div className={styles.messageHeader}>
          <span className={styles.messageSender}>
            {isUser ? 'Вы' : 'GigaChat'}
          </span>
          <span className={styles.messageTime}>{message.time}</span>
        </div>
        
        <div className={styles.messageText}>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
      
      {!isUser && (
        <button 
          className={`${styles.messageCopyBtn} ${copied ? styles.visible : ''}`} 
          onClick={handleCopy}
          type="button"
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
              <span>Скопировано</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 1.5a.5.5 0 0 1 .5.5v1h8a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 13.5 15h-9A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h.5V2a.5.5 0 0 1 .5-.5zm.5 2.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-9z"/>
              </svg>
              <span>Копировать</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};