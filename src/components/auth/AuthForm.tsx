import React, { useState } from 'react';
import { ErrorMessage } from '../ui/ErrorMessage';
import { AuthData } from '../../types';
import styles from './AuthForm.module.css';

interface AuthFormProps {
  onLogin: (data: AuthData) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [authKey, setAuthKey] = useState('');
  const [scope, setScope] = useState<AuthData['scope']>('GIGACHAT_API_PERS');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authKey.trim()) {
      setError('Введите Authorization Key');
      return;
    }
    
    localStorage.setItem('authKey', authKey.trim());
    localStorage.setItem('scope', scope);
    
    onLogin({ credentials: authKey.trim(), scope });
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authFormWrapper}>
        <div className={styles.authLogo}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="32" cy="32" r="28"/>
            <circle cx="32" cy="32" r="12" fill="currentColor" stroke="none"/>
          </svg>
          <h1>GigaChat</h1>
        </div>
        
        <div className={styles.authInfo}>
          <p>
            Вставьте <strong>Authorization Key</strong> из{' '}
            <a href="https://developers.sber.ru/studio" target="_blank" rel="noreferrer">
              GigaChat Studio
            </a>
          </p>
          <p className={styles.authHint}>
            Настройки API → Получить ключ → скопируйте значение
          </p>
        </div>
        
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.authGroup}>
            <label className={styles.authLabel}>Authorization Key</label>
            <input
              type="password"
              className={styles.authInput}
              value={authKey}
              onChange={(e) => {
                setAuthKey(e.target.value);
                setError('');
              }}
              placeholder="AUTHKEY==..."
            />
          </div>
          
          <div className={styles.authGroup}>
            <label className={styles.authLabel}>Scope</label>
            <div className={styles.authRadioGroup}>
              <label className={styles.authRadio}>
                <input
                  type="radio"
                  name="scope"
                  value="GIGACHAT_API_PERS"
                  checked={scope === 'GIGACHAT_API_PERS'}
                  onChange={(e) => setScope(e.target.value as AuthData['scope'])}
                />
                <span>Персональный</span>
              </label>
            </div>
          </div>
          
          {error && <ErrorMessage message={error} />}
          
          <button type="submit" className={styles.authSubmit}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};