import React from 'react';
import './radio.css';

/**
 * Radio Component - Synchronized with Figma Design System
 *
 * A flexible radio button component with full interaction support.
 * Synchronized with OneChaps Figma file (oc-radio-light).
 */

export interface RadioProps {
  /** Whether the radio is selected */
  checked?: boolean;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text (optional) */
  label?: string;
  /** Additional CSS classes */
  className?: string;
  /** Input name attribute */
  name?: string;
  /** Input value attribute */
  value?: string;
}

export const Radio: React.FC<RadioProps> = ({
  checked = false,
  disabled = false,
  onChange,
  label,
  className = '',
  name,
  value
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isKeyboardFocus, setIsKeyboardFocus] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(event.target.checked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' && !disabled) {
      event.preventDefault();
      if (onChange) {
        onChange(!checked);
      }
    }
    setIsKeyboardFocus(true);
  };

  const handleMouseDown = () => {
    setIsKeyboardFocus(false);
  };

  return (
    <label
      className={`oc-radio-wrapper${disabled ? ' oc-radio-wrapper--disabled' : ''} ${className}`.trim()}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
    >
      <input
        type="radio"
        className="oc-radio__input"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setIsKeyboardFocus(false);
        }}
        name={name}
        value={value}
        aria-checked={checked}
      />
      <span
        className={`oc-radio${checked ? ' oc-radio--checked' : ''}${disabled ? ' oc-radio--disabled' : ''}${isFocused && isKeyboardFocus ? ' oc-radio--focused' : ''}`.trim()}
      >
        <span className="oc-radio__outer" />
        <span className="oc-radio__dot" />
      </span>
      {label && (
        <span className={`oc-radio__label${disabled ? ' oc-radio__label--disabled' : ''}`.trim()}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Radio;
