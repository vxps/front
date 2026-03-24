import React, { useState, useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { Sidebar } from './components/sidebar/Sidebar';
import { ChatWindow } from './components/chat/ChatWindow';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { AuthForm } from './components/auth/AuthForm';
import { AuthData, AppSettings } from './types';
import './styles/theme.css';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLogin = (data: AuthData) => {
    console.log('Login:', data);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleNewChat = () => {
    console.log('New chat');
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleChatSelect = (id: number) => {
    console.log('Select chat:', id);
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
    <div className="app">
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
      
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
      />
    </div>
  );
}

export default App;