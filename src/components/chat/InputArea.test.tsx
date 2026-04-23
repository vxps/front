import { describe, it, expect, beforeEach } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputArea } from './InputArea';

describe('InputArea', () => {
  const mockOnSend = jest.fn();
  const mockOnStop = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render textarea and send button', () => {
    render(<InputArea onSend={mockOnSend} isLoading={false} />);

    expect(screen.getByPlaceholderText('Введите сообщение...')).toBeTruthy();
    expect(screen.getByRole('button', { name: /отправить/i })).toBeTruthy();
  });

  it('should call onSend when clicking send button with non-empty value', async () => {
    const user = userEvent.setup();
    render(<InputArea onSend={mockOnSend} isLoading={false} />);

    const textarea = screen.getByPlaceholderText('Введите сообщение...');
    await user.type(textarea, 'Hello');

    const sendButton = screen.getByRole('button', { name: /отправить/i });
    await user.click(sendButton);

    expect(mockOnSend).toHaveBeenCalledWith('Hello');
  });

  it('should call onSend when pressing Enter without Shift', async () => {
    const user = userEvent.setup();
    render(<InputArea onSend={mockOnSend} isLoading={false} />);

    const textarea = screen.getByPlaceholderText('Введите сообщение...');
    await user.type(textarea, 'Hello{Enter}');

    expect(mockOnSend).toHaveBeenCalledWith('Hello');
  });

  it('should NOT call onSend when pressing Shift+Enter', async () => {
    const user = userEvent.setup();
    render(<InputArea onSend={mockOnSend} isLoading={false} />);

    const textarea = screen.getByPlaceholderText('Введите сообщение...');
    await user.type(textarea, 'Hello{Shift>}{Enter}{/Shift}');

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it('should disable send button when input is empty', () => {
    render(<InputArea onSend={mockOnSend} isLoading={false} />);

    const sendButton = screen.getByRole('button', { name: /отправить/i });
    expect((sendButton as HTMLButtonElement).disabled).toBe(true);
  });

  it('should disable send button when input contains only whitespace', async () => {
    const user = userEvent.setup();
    render(<InputArea onSend={mockOnSend} isLoading={false} />);

    const textarea = screen.getByPlaceholderText('Введите сообщение...');
    await user.type(textarea, '   ');

    const sendButton = screen.getByRole('button', { name: /отправить/i });
    expect((sendButton as HTMLButtonElement).disabled).toBe(true);
  });

  it('should enable send button when input has content', async () => {
    const user = userEvent.setup();
    render(<InputArea onSend={mockOnSend} isLoading={false} />);

    const textarea = screen.getByPlaceholderText('Введите сообщение...');
    await user.type(textarea, 'Hello');

    const sendButton = screen.getByRole('button', { name: /отправить/i });
    expect((sendButton as HTMLButtonElement).disabled).toBe(false);
  });

  it('should show stop button when isLoading is true', () => {
    render(<InputArea onSend={mockOnSend} isLoading={true} onStop={mockOnStop} />);

    expect(screen.getByRole('button', { name: /стоп/i })).toBeTruthy();
    expect(screen.queryByRole('button', { name: /отправить/i })).toBeFalsy();
  });

  it('should call onStop when clicking stop button', async () => {
    const user = userEvent.setup();
    render(<InputArea onSend={mockOnSend} isLoading={true} onStop={mockOnStop} />);

    const stopButton = screen.getByRole('button', { name: /стоп/i });
    await user.click(stopButton);

    expect(mockOnStop).toHaveBeenCalled();
  });

  it('should clear textarea after sending message', async () => {
    const user = userEvent.setup();
    render(<InputArea onSend={mockOnSend} isLoading={false} />);

    const textarea = screen.getByPlaceholderText('Введите сообщение...');
    await user.type(textarea, 'Hello');

    const sendButton = screen.getByRole('button', { name: /отправить/i });
    await user.click(sendButton);

    expect((textarea as HTMLTextAreaElement).value).toBe('');
  });

  it('should disable textarea when isLoading is true', () => {
    render(<InputArea onSend={mockOnSend} isLoading={true} />);

    const textarea = screen.getByPlaceholderText('Введите сообщение...');
    expect((textarea as HTMLTextAreaElement).disabled).toBe(true);
  });
});