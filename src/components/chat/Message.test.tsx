jest.mock('react-syntax-highlighter', () => ({
  Prism: () => null,
}));

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  oneDark: {},
}));

jest.mock('react-markdown', () => {
  return function MockMarkdown({ children }: { children: React.ReactNode }) {
    return <div data-testid="markdown">{children}</div>;
  };
});

import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Message } from './Message';

describe('Message', () => {
  const userMessage = {
    id: '1',
    text: 'Hello from user',
    sender: 'user' as const,
    time: '10:00',
  };

  const assistantMessage = {
    id: '2',
    text: 'Hello from assistant',
    sender: 'assistant' as const,
    time: '10:01',
  };

  it('should display sender name for user', () => {
    render(<Message message={userMessage} />);
    expect(screen.getByText('Вы')).toBeTruthy();
  });

  it('should display sender name for assistant', () => {
    render(<Message message={assistantMessage} />);
    expect(screen.getByText('GigaChat')).toBeTruthy();
  });

  it('should display message time', () => {
    render(<Message message={userMessage} />);
    expect(screen.getByText('10:00')).toBeTruthy();
  });

  it('should NOT show copy button for user messages', () => {
    render(<Message message={userMessage} />);
    expect(screen.queryByText('Копировать')).toBeFalsy();
  });

  it('should show copy button for assistant messages', () => {
    render(<Message message={assistantMessage} />);
    expect(screen.getByText('Копировать')).toBeTruthy();
  });

  it('should NOT have avatar for user messages', () => {
    render(<Message message={userMessage} />);
    const avatar = document.querySelector('.message-avatar');
    expect(avatar).toBeFalsy();
  });
});