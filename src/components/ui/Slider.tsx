import React from 'react';
import './Slider.css';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  showValue?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 0.1,
  label,
  showValue = true,
}) => {
  return (
    <div className="slider-container">
      <div className="slider-header">
        <label className="slider-label">{label}</label>
        {showValue && <span className="slider-value">{value.toFixed(2)}</span>}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="slider-input"
      />
      <div className="slider-range">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};