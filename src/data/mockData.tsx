import { Chat, Message } from '../types';

export const mockChats: Chat[] = [
  { id: 1, title: 'Помощь с кодом', lastMessage: 'Спасибо!', date: '10:30', isActive: true },
  { id: 2, title: 'Анализ данных', lastMessage: 'Готово', date: 'Вчера', isActive: false },
  { id: 3, title: 'Перевод текста', lastMessage: 'Отлично!', date: 'Вчера', isActive: false },
  { id: 4, title: 'Написание статьи', lastMessage: 'Проверю', date: '12 янв', isActive: false },
  { id: 5, title: 'Генерация идей', lastMessage: 'Интересно', date: '10 янв', isActive: false },
];

export const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Помоги мне', sender: 'user', time: '10:25' },
  { id: 2, text: '**Здравствуйте!** Чем могу помочь?', sender: 'assistant', time: '10:26' },
  { id: 3, text: 'Нужен совет по коду', sender: 'user', time: '10:27' },
  { id: 4, text: 'Конечно! Вот пример:\n```python\nprint("Hello")\n```', sender: 'assistant', time: '10:28' },
  { id: 5, text: 'Спасибо большое!', sender: 'user', time: '10:29' },
  { id: 6, text: 'Всегда пожалуйста!', sender: 'assistant', time: '10:30' },
];