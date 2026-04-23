import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Sidebar } from './components/sidebar/Sidebar';
import { ChatWindow } from './components/chat/ChatWindow';
import { AuthForm } from './components/auth/AuthForm';
import { useChatStore } from './store/chatStore';
import { AuthData, AppSettings } from './types';
import './styles/theme.css';
import styles from './App.module.css';

const SettingsPanel = lazy(() => import('./components/settings/SettingsPanel'));

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  
  const { activeChatId, chats, setActiveChat, createChat } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isAuthenticated && activeChatId === null && chats.length > 0) {
      navigate(`/chat/${chats[0].id}`, { replace: true });
    }
  }, [activeChatId, chats, isAuthenticated, navigate]);

  const handleLogin = (data: AuthData) => {
    console.log('Login:', data);
    localStorage.setItem('credentials', data.credentials);
    localStorage.setItem('scope', data.scope);
    setIsAuthenticated(true);
    
    if (chats.length === 0) {
      const newChat = createChat();
      navigate(`/chat/${newChat.id}`, { replace: true });
    } else {
      navigate(`/chat/${chats[0].id}`, { replace: true });
    }
  };

  const handleNewChat = () => {
    const newChat = createChat();
    navigate(`/chat/${newChat.id}`);
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleChatSelect = (id: string) => {
    setActiveChat(id);
    if (id !== activeChatId) {
      navigate(`/chat/${id}`);
    }
  };

  const handleSaveSettings = (settings: AppSettings) => {
    console.log('Save settings:', settings);
    if (settings.theme !== theme) {
      setTheme(settings.theme);
    }
  };

  if (!isAuthenticated) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className={styles.app}>
      <AppLayout
        sidebar={
          <Sidebar
            onNewChat={handleNewChat}
            onSearch={handleSearch}
            onChatSelect={handleChatSelect}
          />
        }
      >
        <ChatWindow
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      </AppLayout>
      
      <Suspense fallback={<div className="loading-spinner">Загрузка настроек...</div>}>
        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onSave={handleSaveSettings}
        />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat/:id" element={<AppContent />} />
        <Route path="/" element={<Navigate to="/chat/default" replace />} />
        <Route path="*" element={<Navigate to="/chat/default" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;