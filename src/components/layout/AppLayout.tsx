import React, { useState } from 'react';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, sidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.appLayout}>
      <button 
        className={styles.burgerBtn}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>
      
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        {sidebar}
      </aside>
      
      <main className={styles.chatArea} onClick={() => setIsSidebarOpen(false)}>
        {children}
      </main>
      
      {isSidebarOpen && (
        <div className={styles.sidebarOverlay} onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </div>
  );
};