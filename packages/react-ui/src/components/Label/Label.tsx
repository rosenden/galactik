import React from 'react';
import './label.css';

/**
 * Label Component - Synchronized with Figma Design System
 * 
 * A flexible label/tag component for categorization, status display, or metadata.
 * 
 * @example
 * ```tsx
 * import Label from '@galactik/react-ui/components/Label';
 * 
 * // Basic label
 * <Label text="New Feature" color="success" />
 * 
 * // With icon
 * <Label text="Beta" color="warning" icon={<StarIcon />} />
 * 
 * // Different sizes
 * <Label text="Small" size="small" color="info" />
 * <Label text="Medium" size="medium" color="sage" />
 * 
 * // Clickable label
 * <Label 
 *   text="Click me" 
 *   color="black" 
 *   onClick={() => console.log('Clicked!')} 
 * />
 * 
 * // All available colors:
 * // sage, black, success, error, warning, info
 * ```
 */

type LabelSize = 'small' | 'medium';
type LabelColor =
  | 'sage'
  | 'black'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface LabelProps {
  /** The text content displayed in the label */
  text: string;
  /** Size of the label (small/medium) */
  size?: LabelSize;
  /** Color theme from Figma: sage, black, success, error, warning, info */
  color?: LabelColor;
  /** Optional leading icon */
  icon?: React.ReactNode;
}

/**
 * Label component for displaying tags, categories, or status indicators
 */
const Label: React.FC<LabelProps> = ({
  text,
  size = 'medium',
  color = 'sage',
  icon,
}) => {
  const baseClass = 'oc-label';
  
  const classes = [
    baseClass,
    `${baseClass}--${size}`,
    `${baseClass}--${color}`,
    `${baseClass}--default`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {icon && <span className={`${baseClass}__icon`}>{icon}</span>}
      <span className={`${baseClass}__text`}>{text}</span>
    </span>
  );
};

export default Label;
