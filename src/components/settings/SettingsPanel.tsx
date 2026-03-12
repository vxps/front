import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Slider } from '../ui/Slider';
import { Toggle } from '../ui/Toggle';
import './SettingsPanel.css';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: any) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose, onSave }) => {
  const [model, setModel] = useState('GIGACHAT_API_PERS');
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ model, temperature, topP, maxTokens, systemPrompt, theme });
    onClose();
  };

  const handleReset = () => {
    setModel('GIGACHAT_API_PERS');
    setTemperature(0.7);
    setTopP(0.9);
    setMaxTokens(1000);
    setSystemPrompt('');
    setTheme('light');
  };

  return (
    <div className="settings-panel-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <header className="settings-header">
          <h2>Настройки</h2>
          <button className="settings-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414z"/>
            </svg>
          </button>
        </header>
        
        <div className="settings-content">
          <div className="settings-group">
            <label className="settings-label">Модель</label>
            <select 
              className="settings-select"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="GIGACHAT_API_PERS">GigaChat</option>
              <option value="GIGACHAT_API_B2B">GigaChat-Plus</option>
              <option value="GIGACHAT_API_CORP">GigaChat-Pro</option>
              <option value="GIGACHAT_MAX">GigaChat-Max</option>
            </select>
          </div>
          
          <Slider
            label="Temperature"
            value={temperature}
            onChange={setTemperature}
            min={0}
            max={2}
            step={0.1}
          />
          
          <Slider
            label="Top-P"
            value={topP}
            onChange={setTopP}
            min={0}
            max={1}
            step={0.05}
          />
          
          <div className="settings-group">
            <label className="settings-label">Max Tokens</label>
            <input
              type="number"
              className="settings-input"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              min={1}
              max={4000}
            />
          </div>
          
          <div className="settings-group">
            <label className="settings-label">System Prompt</label>
            <textarea
              className="settings-textarea"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Введите системный промпт..."
              rows={4}
            />
          </div>
          
          <Toggle
            label="Тёмная тема"
            checked={theme === 'dark'}
            onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>
        
        <footer className="settings-footer">
          <Button variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </footer>
      </div>
    </div>
  );
};