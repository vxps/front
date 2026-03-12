import React, { useState } from 'react';
import './AppLayout.css';

interface AppLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, sidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <button 
        className="burger-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>
      
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {sidebar}
      </aside>
      
      <main className="chat-area" onClick={() => setIsSidebarOpen(false)}>
        {children}
      </main>
      
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </div>
  );
};