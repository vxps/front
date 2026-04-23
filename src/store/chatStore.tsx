import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chat, Message, ChatState } from '../types';

interface ChatStore extends ChatState {
  // Actions
  setActiveChat: (id: string | null) => void;
  createChat: () => Chat;
  deleteChat: (id: string) => void;
  updateChatTitle: (id: string, title: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: string, content: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  getActiveChat: () => Chat | undefined;
}

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const generateChatTitle = (firstMessage: string): string => {
  const trimmed = firstMessage.trim();
  if (!trimmed) return 'Новый чат';
  if (trimmed.length <= 40) return trimmed;
  return trimmed.substring(0, 37) + '...';
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChatId: null,
      isLoading: false,
      error: null,

      setActiveChat: (id) => set({ activeChatId: id }),

      createChat: () => {
        const newChat: Chat = {
          id: generateId(),
          title: 'Новый чат',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChatId: newChat.id,
        }));
        return newChat;
      },

      deleteChat: (id) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
          activeChatId: state.activeChatId === id ? null : state.activeChatId,
        }));
      },

      updateChatTitle: (id, title) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === id ? { ...chat, title, updatedAt: Date.now() } : chat
          ),
        }));
      },

      addMessage: (chatId, message) => {
        set((state) => {
          const chat = state.chats.find((c) => c.id === chatId);
          
          // Автогенерация названия по первому сообщению
          let newTitle = chat?.title;
          if (chat && chat.messages.length === 0 && message.role === 'user') {
            newTitle = generateChatTitle(message.content);
          }

          return {
            chats: state.chats.map((chat) =>
              chat.id === chatId
                ? {
                    ...chat,
                    title: newTitle || chat.title,
                    messages: [...chat.messages, message],
                    updatedAt: Date.now(),
                  }
                : chat
            ),
          };
        });
      },

      updateMessage: (chatId, messageId, content) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: chat.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, content } : msg
                  ),
                  updatedAt: Date.now(),
                }
              : chat
          ),
        }));
      },

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      getActiveChat: () => {
        const state = get();
        return state.chats.find((chat) => chat.id === state.activeChatId);
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ chats: state.chats, activeChatId: state.activeChatId }),
    }
  )
);