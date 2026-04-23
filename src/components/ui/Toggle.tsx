import React from 'react';
import './Toggle.module.css';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  return (
    <label className="toggle">
      {label && <span className="toggleLabel">{label}</span>}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="toggleInput"
      />
      <span className="toggleSlider"></span>
    </label>
  );
};