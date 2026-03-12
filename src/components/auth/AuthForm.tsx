import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';
import { AuthData } from '../../types';
import './AuthForm.css';

interface AuthFormProps {
  onLogin: (data: AuthData) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState('');
  const [scope, setScope] = useState<AuthData['scope']>('GIGACHAT_API_PERS');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.trim()) {
      setError('Поле Credentials не может быть пустым');
      return;
    }
    
    onLogin({ credentials, scope });
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-logo">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor">
            <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4zm0 52C18.745 56 8 45.255 8 32S18.745 8 32 8s24 10.745 24 24-10.745 24-24 24z"/>
          </svg>
          <h1>GigaChat</h1>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-group">
            <label className="auth-label">Credentials</label>
            <input
              type="password"
              className="auth-input"
              value={credentials}
              onChange={(e) => {
                setCredentials(e.target.value);
                setError('');
              }}
              placeholder="Введите Base64 строку"
            />
            {error && <ErrorMessage message={error} />}
          </div>
          
          <div className="auth-group">
            <label className="auth-label">Scope</label>
            <div className="auth-radio-group">
              <label className="auth-radio">
                <input
                  type="radio"
                  name="scope"
                  value="GIGACHAT_API_PERS"
                  checked={scope === 'GIGACHAT_API_PERS'}
                  onChange={(e) => setScope(e.target.value as AuthData['scope'])}
                />
                <span>Персональный</span>
              </label>
              
              <label className="auth-radio">
                <input
                  type="radio"
                  name="scope"
                  value="GIGACHAT_API_B2B"
                  checked={scope === 'GIGACHAT_API_B2B'}
                  onChange={(e) => setScope(e.target.value as AuthData['scope'])}
                />
                <span>B2B</span>
              </label>
              
              <label className="auth-radio">
                <input
                  type="radio"
                  name="scope"
                  value="GIGACHAT_API_CORP"
                  checked={scope === 'GIGACHAT_API_CORP'}
                  onChange={(e) => setScope(e.target.value as AuthData['scope'])}
                />
                <span>Корпоративный</span>
              </label>
            </div>
          </div>
          
          <Button type="submit" variant="primary" className="auth-submit">
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
};