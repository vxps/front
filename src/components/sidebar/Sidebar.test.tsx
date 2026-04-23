import { describe, it, expect, beforeEach } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar';
import { useChatStore } from '../../store/chatStore';

describe('Sidebar', () => {
  const mockOnNewChat = jest.fn();
  const mockOnSearch = jest.fn();
  const mockOnChatSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useChatStore.setState({
      chats: [
        {
          id: '1',
          title: 'Чат 1',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: '2',
          title: 'Чат 2',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
      activeChatId: '1',
      isLoading: false,
      error: null,
    });
  });

  it('should render new chat button', () => {
    render(
      <Sidebar
        onNewChat={mockOnNewChat}
        onSearch={mockOnSearch}
        onChatSelect={mockOnChatSelect}
      />
    );
    expect(screen.getByText('Новый чат')).toBeTruthy();
  });

  it('should render search input', () => {
    render(
      <Sidebar
        onNewChat={mockOnNewChat}
        onSearch={mockOnSearch}
        onChatSelect={mockOnChatSelect}
      />
    );
    expect(screen.getByPlaceholderText('Поиск по чатам...')).toBeTruthy();
  });

  it('should call onNewChat when clicking new chat button', async () => {
    const user = userEvent.setup();
    render(
      <Sidebar
        onNewChat={mockOnNewChat}
        onSearch={mockOnSearch}
        onChatSelect={mockOnChatSelect}
      />
    );

    const newChatButton = screen.getByText('Новый чат');
    await user.click(newChatButton);

    expect(mockOnNewChat).toHaveBeenCalled();
  });

  it('should call onSearch when typing in search input', async () => {
    const user = userEvent.setup();
    render(
      <Sidebar
        onNewChat={mockOnNewChat}
        onSearch={mockOnSearch}
        onChatSelect={mockOnChatSelect}
      />
    );

    const searchInput = screen.getByPlaceholderText('Поиск по чатам...');
    await user.type(searchInput, 'test');

    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('should display all chats when search is empty', () => {
    render(
      <Sidebar
        onNewChat={mockOnNewChat}
        onSearch={mockOnSearch}
        onChatSelect={mockOnChatSelect}
      />
    );
    expect(screen.getByText('Чат 1')).toBeTruthy();
    expect(screen.getByText('Чат 2')).toBeTruthy();
  });

  it('should call onChatSelect when clicking on chat', async () => {
    const user = userEvent.setup();
    render(
      <Sidebar
        onNewChat={mockOnNewChat}
        onSearch={mockOnSearch}
        onChatSelect={mockOnChatSelect}
      />
    );

    const chatItem = screen.getByText('Чат 1');
    await user.click(chatItem);

    expect(mockOnChatSelect).toHaveBeenCalledWith('1');
  });

  it('should show delete button on chat item', () => {
    render(
      <Sidebar
        onNewChat={mockOnNewChat}
        onSearch={mockOnSearch}
        onChatSelect={mockOnChatSelect}
      />
    );
    const deleteButtons = screen.getAllByTitle('Удалить чат');
    expect(deleteButtons.length).toBeGreaterThan(0);
  });
});