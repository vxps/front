import { describe, it, expect, beforeEach } from '@jest/globals';
import { useChatStore } from './chatStore';
import { Message } from '../types';

describe('chatStore', () => {
  beforeEach(() => {
    useChatStore.setState({
      chats: [],
      activeChatId: null,
      isLoading: false,
      error: null,
    });
  });

  describe('createChat', () => {
    it('should create a new chat with unique id', () => {
      const newChat = useChatStore.getState().createChat();
      
      expect(newChat.id).toBeDefined();
      expect(newChat.title).toBe('Новый чат');
      expect(newChat.messages).toEqual([]);
      expect(useChatStore.getState().chats).toHaveLength(1);
    });

    it('should set activeChatId to new chat id', () => {
      const newChat = useChatStore.getState().createChat();
      expect(useChatStore.getState().activeChatId).toBe(newChat.id);
    });
  });

  describe('addMessage', () => {
    it('should add message to chat messages array', () => {
      const chat = useChatStore.getState().createChat();
      const message: Message = {
        id: '1',
        role: 'user',
        content: 'Hello',
        timestamp: Date.now(),
      };

      useChatStore.getState().addMessage(chat.id, message);

      const updatedChat = useChatStore.getState().getActiveChat();
      expect(updatedChat?.messages).toHaveLength(1);
      expect(updatedChat?.messages[0]).toEqual(message);
    });

    it('should auto-generate chat title from first user message', () => {
      const chat = useChatStore.getState().createChat();
      const message: Message = {
        id: '1',
        role: 'user',
        content: 'Помощь с кодом на Python',
        timestamp: Date.now(),
      };

      useChatStore.getState().addMessage(chat.id, message);

      const updatedChat = useChatStore.getState().getActiveChat();
      expect(updatedChat?.title).toBe('Помощь с кодом на Python');
    });

    it('should trim long titles to 40 characters', () => {
      const chat = useChatStore.getState().createChat();
      const message: Message = {
        id: '1',
        role: 'user',
        content: 'Очень длинный вопрос который точно будет обрезан до сорока символов',
        timestamp: Date.now(),
      };

      useChatStore.getState().addMessage(chat.id, message);

      const updatedChat = useChatStore.getState().getActiveChat();
      expect(updatedChat?.title.length).toBeLessThanOrEqual(40);
    });
  });

  describe('deleteChat', () => {
    it('should remove chat from chats array', () => {
      const chat1 = useChatStore.getState().createChat();
      const chat2 = useChatStore.getState().createChat();

      useChatStore.getState().deleteChat(chat1.id);

      expect(useChatStore.getState().chats).toHaveLength(1);
      expect(useChatStore.getState().chats[0].id).toBe(chat2.id);
    });

    it('should reset activeChatId when deleting active chat', () => {
      const chat = useChatStore.getState().createChat();
      useChatStore.getState().setActiveChat(chat.id);

      useChatStore.getState().deleteChat(chat.id);

      expect(useChatStore.getState().activeChatId).toBeNull();
    });

    it('should keep activeChatId when deleting non-active chat', () => {
      const chat1 = useChatStore.getState().createChat();
      const chat2 = useChatStore.getState().createChat();
      useChatStore.getState().setActiveChat(chat1.id);

      useChatStore.getState().deleteChat(chat2.id);

      expect(useChatStore.getState().activeChatId).toBe(chat1.id);
    });
  });

  describe('updateChatTitle', () => {
    it('should update chat title by id', () => {
      const chat = useChatStore.getState().createChat();
      const newTitle = 'Updated Title';

      useChatStore.getState().updateChatTitle(chat.id, newTitle);

      const updatedChat = useChatStore.getState().getActiveChat();
      expect(updatedChat?.title).toBe(newTitle);
    });
  });

  describe('updateMessage', () => {
    it('should update message content by id', () => {
      const chat = useChatStore.getState().createChat();
      const message: Message = {
        id: '1',
        role: 'assistant',
        content: 'Original',
        timestamp: Date.now(),
      };
      useChatStore.getState().addMessage(chat.id, message);

      useChatStore.getState().updateMessage(chat.id, '1', 'Updated');

      const updatedChat = useChatStore.getState().getActiveChat();
      expect(updatedChat?.messages[0].content).toBe('Updated');
    });
  });

  describe('setLoading', () => {
    it('should set isLoading state', () => {
      expect(useChatStore.getState().isLoading).toBe(false);

      useChatStore.getState().setLoading(true);
      expect(useChatStore.getState().isLoading).toBe(true);

      useChatStore.getState().setLoading(false);
      expect(useChatStore.getState().isLoading).toBe(false);
    });
  });

  describe('setError', () => {
    it('should set and clear error state', () => {
      expect(useChatStore.getState().error).toBeNull();

      useChatStore.getState().setError('Test error');
      expect(useChatStore.getState().error).toBe('Test error');

      useChatStore.getState().clearError();
      expect(useChatStore.getState().error).toBeNull();
    });
  });
});