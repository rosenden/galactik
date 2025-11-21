import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus } from '@fortawesome/pro-regular-svg-icons';
import './checkbox.css';

/**
 * Checkbox Component - Synchronized with Figma Design System
 * 
 * A flexible checkbox component with three selection states and full interaction support.
 * Synchronized with OneChaps Figma file.
 */

export type CheckboxSelection = 'unselected' | 'selected' | 'indeterminate';

export interface CheckboxProps {
  /** Whether the checkbox is checked, unchecked, or indeterminate */
  checked?: boolean;
  /** Indeterminate state (shows minus icon) */
  indeterminate?: boolean;
  /** Whether the checkbox is disabled */
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

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
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

  const getSelectionState = (): CheckboxSelection => {
    if (indeterminate) return 'indeterminate';
    if (checked) return 'selected';
    return 'unselected';
  };

  const selectionState = getSelectionState();

  return (
    <label
      className={`oc-checkbox-wrapper ${disabled ? 'oc-checkbox-wrapper--disabled' : ''} ${className}`}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
    >
      <input
        type="checkbox"
        className="oc-checkbox__input"
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
        aria-checked={indeterminate ? 'mixed' : checked}
      />
      
      <div
        className={`
          oc-checkbox
          oc-checkbox--${selectionState}
          ${disabled ? 'oc-checkbox--disabled' : ''}
          ${isFocused && isKeyboardFocus ? 'oc-checkbox--focused' : ''}
        `.trim()}
      >
        <div className="oc-checkbox__icon">
          <FontAwesomeIcon icon={indeterminate ? faMinus : faCheck} />
        </div>
      </div>

      {label && (
        <span className={`oc-checkbox__label ${disabled ? 'oc-checkbox__label--disabled' : ''}`}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
