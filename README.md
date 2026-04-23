## 📦 Стек технологий

- **Фреймворк**: React 18 + TypeScript
- **State Management**: Zustand + persist middleware
- **Роутинг**: React Router v6
- **Стили**: CSS Modules
- **Тестирование**: Jest + React Testing Library
- **HTTP-клиент**: Fetch API + Axios (в прокси)
- **Markdown**: react-markdown + react-syntax-highlighter
- **Сборка**: Create React App

##  Быстрый старт

## пример работы в /app/docs

### Предварительные требования
- Node.js 16+
- npm 8+
- Аккаунт в [GigaChat Studio](https://developers.sber.ru/studio) API

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/vxps/front

# Установить зависимости
npm install

# Терминал 1: запустить прокси-сервер (необходим из-за блокировки корс - она у меня была)
cd proxy
node server.js

# Терминал 2: запустить React-приложение
cd ..
npm start

# Команда для сборки
npm run build

# Запустить все тесты
npm test

# Запустить с отчётом о покрытии
npm run test:coverage
