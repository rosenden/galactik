import React, { useState, useRef, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './Input.css';

export type InputSize = 'small' | 'medium' | 'large';
export type InputVariant = 'default' | 'success' | 'error';
export type InputType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';

export interface InputProps {
  /**
   * Input value
   */
  value?: string;
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string;
  /**
   * Change handler
   */
  onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Placeholder text
   * @default 'Lorem ipsum'
   */
  placeholder?: string;
  /**
   * Input size
   * - small: 24px height
   * - medium: 36px height (default)
   * - large: 44px height
   * @default 'medium'
   */
  size?: InputSize;
  /**
   * Input variant
   * - default: standard input
   * - success: green styling
   * - error: red/cherry styling
   * @default 'default'
   */
  variant?: InputVariant;
  /**
   * Input type
   * @default 'text'
   */
  type?: InputType;
  /**
   * Left icon (FontAwesome)
   */
  iconLeft?: IconDefinition;
  /**
   * Right icon(s) (FontAwesome) - can be array for multiple icons
   */
  iconRight?: IconDefinition | IconDefinition[];
  /**
   * Show character counter
   * Format: "0/320"
   */
  maxLength?: number;
  /**
   * Show counter even without maxLength
   */
  showCounter?: boolean;
  /**
   * Show number controls (up/down chevrons) for number inputs
   * @default true for type="number"
   */
  showNumberControls?: boolean;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Whether the input is readonly
   */
  readonly?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Name attribute
   */
  name?: string;
  /**
   * ID attribute
   */
  id?: string;
  /**
   * Required attribute
   */
  required?: boolean;
  /**
   * Aria label
   */
  'aria-label'?: string;
}

/**
 * Input component from Figma "OneChaps UI kit" - oc-input
 * 
 * Specifications from Figma (2025-12-12):
 * - Font: Hanken Grotesk 14px / 400
 * - States: default/empty, active, filled, hovered, focus, readonly, disabled
 * - Variants: default, success, error
 * - Sizes: small (24px), medium (36px), large (44px)
 * - Border radius: 8px
 * - Gap between elements: 8px
 * 
 * States color mapping:
 * - default/empty: text #5D7374, icons #445556, border #445556 1px
 * - active: (onClick/typing) text #182021, icons #2D393A, border #2D393A 2px (primary pressed)
 * - filled: text #182021, icons #445556, border #445556 1px
 * - hovered: text #374648, icons #374648
 * - focus: (keyboard Tab navigation) double stroke: outline #926E9B 2px + border #A9C1B8 1px
 * - readonly: bg #F1F8F4, text #182021, no border, no counter/controls
 * - disabled: text #626C84, icons #626C84, opacity 0.6
 * - success: border #A9C1B8 (green)
 * - error: border/text #DC004E (cherry)
 * 
 * Counter: 12px Hanken Grotesk / 400, color #445556
 * Number controls: vertical chevrons (up/down) on medium/large, horizontal on small
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  value,
  defaultValue,
  onChange,
  placeholder = 'Lorem ipsum',
  size = 'medium',
  variant = 'default',
  type = 'text',
  iconLeft,
  iconRight,
  maxLength,
  showCounter = false,
  showNumberControls,
  disabled = false,
  readonly = false,
  className = '',
  onBlur,
  onFocus,
  name,
  id,
  required,
  'aria-label': ariaLabel,
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  // Determine if we should show number controls
  const shouldShowNumberControls = showNumberControls !== undefined 
    ? showNumberControls 
    : type === 'number';
  
  // Determine states
  const isEmpty = !currentValue || currentValue.length === 0;
  const isFilled = !isEmpty;
  // Active = clicked and typing (shows primary pressed border)
  const isActive = isFocused && !isKeyboardFocus;
  // Focus = keyboard navigation only
  const isFocusVisible = isFocused && isKeyboardFocus;
  
  // Build class names
  const baseClass = 'oc-input';
  const classes = [
    baseClass,
    `${baseClass}--${size}`,
    `${baseClass}--${variant}`,
    isEmpty && !isFocused ? `${baseClass}--empty` : '',
    isFilled && !isFocused && !isHovered ? `${baseClass}--filled` : '',
    isActive ? `${baseClass}--active` : '',
    isHovered && !isFocused ? `${baseClass}--hovered` : '',
    isFocusVisible ? `${baseClass}--focus` : '',
    readonly ? `${baseClass}--readonly` : '',
    disabled ? `${baseClass}--disabled` : '',
    className
  ].filter(Boolean).join(' ');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue, e);
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    // Check if focus was triggered by keyboard (Tab key)
    // This is detected by checking if the event was triggered by keyboard
    setIsKeyboardFocus(e.target.matches(':focus-visible'));
    onFocus?.(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setIsKeyboardFocus(false);
    onBlur?.(e);
  };
  
  const handleMouseDown = () => {
    // When clicking, it's not keyboard focus
    setIsKeyboardFocus(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // When pressing Tab or any key, it's keyboard focus
    if (e.key === 'Tab') {
      setIsKeyboardFocus(true);
    }
  };
  
  const handleIncrement = () => {
    if (type === 'number' && !disabled && !readonly) {
      const num = parseFloat(currentValue || '0');
      const newValue = (num + 1).toString();
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }
  };
  
  const handleDecrement = () => {
    if (type === 'number' && !disabled && !readonly) {
      const num = parseFloat(currentValue || '0');
      const newValue = (num - 1).toString();
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }
  };
  
  // Character counter
  const showCounterDisplay = (showCounter || maxLength) && !readonly;
  const counterText = maxLength 
    ? `${currentValue.length}/${maxLength}`
    : currentValue.length.toString();
  
  // Prepare icon arrays
  const rightIcons = iconRight 
    ? (Array.isArray(iconRight) ? iconRight : [iconRight])
    : [];
  
  return (
    <div 
      className={`${baseClass}-container`}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={classes}>
        {iconLeft && (
          <span className={`${baseClass}__icon-left`}>
            <FontAwesomeIcon icon={iconLeft} />
          </span>
        )}
        
        <input
          ref={ref || inputRef}
          type={type}
          value={currentValue}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          maxLength={maxLength}
          name={name}
          id={id}
          required={required}
          aria-label={ariaLabel}
          className={`${baseClass}__field`}
        />
        
        {showCounterDisplay && (
          <span className={`${baseClass}__counter`}>
            {counterText}
          </span>
        )}
        
        {rightIcons.map((icon, idx) => (
          <span key={idx} className={`${baseClass}__icon-right`}>
            <FontAwesomeIcon icon={icon} />
          </span>
        ))}
        
        {shouldShowNumberControls && !readonly && (
          <div className={`${baseClass}__number-controls ${baseClass}__number-controls--${size}`}>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled}
              className={`${baseClass}__number-button`}
              aria-label="Increment"
            >
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled}
              className={`${baseClass}__number-button`}
              aria-label="Decrement"
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
