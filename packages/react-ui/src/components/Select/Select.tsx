import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './Select.css';

export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  /**
   * Select options
   */
  options: SelectOption[];
  /**
   * Currently selected value
   */
  value?: string;
  /**
   * Change handler
   */
  onChange?: (value: string) => void;
  /**
   * Placeholder text (shown in empty state)
   * @default 'Lorem ipsum dolor'
   */
  placeholder?: string;
  /**
   * Select size
   * - small: compact size
   * - medium: default size
   * - large: larger size
   * @default 'medium'
   */
  size?: SelectSize;
  /**
   * Left icon (FontAwesome)
   * @default faMessageEdit
   */
  icon?: IconDefinition | null;
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  /**
   * Whether the select is readonly (no chevron, not clickable)
   */
  readonly?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Select component from Figma "OneChaps UI kit" - oc-select
 * 
 * Specifications from Figma (2025-12-10):
 * - Font: Hanken Grotesk 14px / 400
 * - States: empty, active, filled, hovered, readonly, disabled, focus
 * - Sizes: small, medium, large
 * - Border radius: 8px
 * - Focus border: #A9C1B8 (1px)
 * 
 * States color mapping:
 * - empty: text #5D7374, icons #445556
 * - active: text #182021, icons #2D393A, chevron-up
 * - filled: text #182021, icons #445556
 * - hovered: text #374648, icons #374648
 * - readonly: text #182021, icons #182021, no chevron
 * - disabled: text #626C84, icons #626C84
 * - focus: text #445556, icons #445556, border #A9C1B8
 */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Lorem ipsum dolor',
  size = 'medium',
  icon = null,
  disabled = false,
  readonly = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Close on click outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (isOpen) {
        if (triggerRef.current && triggerRef.current.contains(target)) return;
        if (listRef.current && listRef.current.contains(target)) return;
        setIsOpen(false);
        setHighlightedIndex(null);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [isOpen]);

  // When opening, ensure a sensible highlighted index
  useEffect(() => {
    if (isOpen) {
      const selIdx = options.findIndex(o => o.value === value);
      setHighlightedIndex(selIdx >= 0 ? selIdx : 0);
      // scroll highlighted into view
      setTimeout(() => {
        if (highlightedIndex !== null && listRef.current) {
          const el = document.getElementById(`oc-select-option-${highlightedIndex}`);
          el?.scrollIntoView({ block: 'nearest' });
        }
      }, 0);
    } else {
      setHighlightedIndex(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const baseClass = 'oc-select';
  
  // Determine current state
  const isEmpty = !value;
  const isFilled = !!value && !isOpen;
  const isActive = isOpen;
  
  const classes = [
    baseClass,
    `${baseClass}--${size}`,
    isEmpty && !isOpen && !isFocused && `${baseClass}--empty`,
    isActive && `${baseClass}--active`,
    isFilled && !isFocused && `${baseClass}--filled`,
    isFocused && !disabled && !readonly && `${baseClass}--focus`,
    disabled && `${baseClass}--disabled`,
    readonly && `${baseClass}--readonly`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (disabled || readonly) return;
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleFocus = () => {
    if (!disabled && !readonly) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    // blur handled by click-outside / keyboard escape for more reliable UX
    setIsFocused(false);
  };

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`${baseClass}-container`}>
      <button
        ref={triggerRef}
        id={`oc-select-trigger-${Math.random().toString(36).slice(2, 9)}`}
        type="button"
        className={classes}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        aria-disabled={disabled}
        aria-readonly={readonly}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        role="combobox"
        onKeyDown={(e) => {
          if (disabled || readonly) return;
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              setHighlightedIndex(0);
            } else {
              setHighlightedIndex(prev => {
                const next = prev === null ? 0 : Math.min(options.length - 1, prev + 1);
                return next;
              });
            }
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              setHighlightedIndex(options.length - 1);
            } else {
              setHighlightedIndex(prev => {
                const next = prev === null ? options.length - 1 : Math.max(0, prev - 1);
                return next;
              });
            }
          } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              setHighlightedIndex(options.findIndex(o => o.value === value) || 0);
            } else if (highlightedIndex !== null) {
              const opt = options[highlightedIndex];
              handleOptionClick(opt.value);
            }
          } else if (e.key === 'Escape') {
            setIsOpen(false);
            setHighlightedIndex(null);
            triggerRef.current?.focus();
          } else if (e.key === 'Home') {
            e.preventDefault();
            setHighlightedIndex(0);
          } else if (e.key === 'End') {
            e.preventDefault();
            setHighlightedIndex(options.length - 1);
          }
        }}
      >
        {icon && (
          <span className={`${baseClass}__icon-left`}>
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        
        <span className={`${baseClass}__text`}>
          {displayText}
        </span>
        
        {!readonly && (
          <span className={`${baseClass}__chevron`}>
            <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
          </span>
        )}
      </button>
      {isOpen && !disabled && !readonly && (
        <div
          ref={listRef}
          className={`${baseClass}-dropdown`}
          role="listbox"
          aria-label="Select options"
        >
          {options.map((option, idx) => {
            const isSelected = option.value === value;
            const isHighlighted = highlightedIndex === idx;
            return (
              <div
                key={option.value}
                id={`oc-select-option-${idx}`}
                role="option"
                aria-selected={isSelected}
                className={`${baseClass}-option ${isHighlighted ? `${baseClass}-option--highlighted` : ''} ${isSelected ? `${baseClass}-option--selected` : ''}`}
                onClick={() => handleOptionClick(option.value)}
                onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
                onMouseEnter={() => setHighlightedIndex(idx)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};


