import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { useChatStore } from './chatStore';

describe('chatStore localStorage persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    useChatStore.setState({
      chats: [],
      activeChatId: null,
      isLoading: false,
      error: null,
    });
    useChatStore.persist.rehydrate();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should save chats to localStorage when state changes', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    
    useChatStore.getState().createChat();
    
    expect(setItemSpy).toHaveBeenCalledWith(
      'chat-storage',
      expect.any(String)
    );
    
    setItemSpy.mockRestore();
  });

  it('should load chats from localStorage on initialization', () => {
    const testChats = [
      {
        id: 'test-1',
        title: 'Test Chat',
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];

    localStorage.setItem(
      'chat-storage',
      JSON.stringify({
        state: {
          chats: testChats,
          activeChatId: 'test-1',
        },
      })
    );

    useChatStore.persist.rehydrate();
    
    const store = useChatStore.getState();
    expect(store.chats).toHaveLength(1);
    expect(store.chats[0].title).toBe('Test Chat');
  });

  it('should handle invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('chat-storage', 'invalid json');

    expect(() => {
      useChatStore.persist.rehydrate();
    }).not.toThrow();

    const store = useChatStore.getState();
    expect(Array.isArray(store.chats)).toBe(true);
  });

  it('should handle empty localStorage', () => {
    localStorage.removeItem('chat-storage');
    
    useChatStore.persist.rehydrate();

    const store = useChatStore.getState();
    expect(store.chats).toEqual([]);
    expect(store.activeChatId).toBeNull();
  });

  it('should persist activeChatId to localStorage', () => {
    const chat = useChatStore.getState().createChat();
    useChatStore.getState().setActiveChat(chat.id);

    const stored = JSON.parse(localStorage.getItem('chat-storage') || '{}');
    expect(stored.state?.activeChatId).toBe(chat.id);
  });

  it('should restore activeChatId from localStorage', () => {
    const testChat = {
      id: 'test-1',
      title: 'Test Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    localStorage.setItem(
      'chat-storage',
      JSON.stringify({
        state: {
          chats: [testChat],
          activeChatId: 'test-1',
        },
      })
    );

    useChatStore.persist.rehydrate();
    
    const store = useChatStore.getState();
    expect(store.activeChatId).toBe('test-1');
  });
});