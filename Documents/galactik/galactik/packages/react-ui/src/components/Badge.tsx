import React from 'react';

export interface BadgeProps {
  /**
   * Label text displayed in the badge
   */
  label: string;
  
  /**
   * Size variant of the badge
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Color variant of the badge
   */
  color?: 'pink' | 'orange' | 'green' | 'blue' | 'red' | 'yellow' | 'cyan' | 'indigo' | 'cherry' | 'sage' | 'grey' | 'almond';
  
  /**
   * Style variant (outline or solid)
   */
  style?: 'primary' | 'secondary';
  
  /**
   * Show icon in the badge
   */
  showIcon?: boolean;
  
  /**
   * Show flag/dot indicator
   */
  showFlag?: boolean;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Optional left icon content
   */
  icon?: React.ReactNode;
  
  /**
   * Badge click handler
   */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({
    label,
    size = 'medium',
    color = 'pink',
    style = 'primary',
    showIcon = false,
    showFlag = false,
    className = '',
    icon,
    onClick
  }, ref) => {
    // Size classes
    const sizeClasses = {
      small: 'px-2 py-1 text-xs',
      medium: 'px-3 py-1.5 text-sm',
      large: 'px-4 py-2 text-base'
    };

    // Color base classes
    const colorMap = {
      pink: 'bg-pink-100 text-pink-900 border-pink-200',
      orange: 'bg-orange-100 text-orange-900 border-orange-200',
      green: 'bg-green-100 text-green-900 border-green-200',
      blue: 'bg-blue-100 text-blue-900 border-blue-200',
      red: 'bg-red-100 text-red-900 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-900 border-yellow-200',
      cyan: 'bg-cyan-100 text-cyan-900 border-cyan-200',
      indigo: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      cherry: 'bg-cherry-100 text-cherry-900 border-cherry-200',
      sage: 'bg-sage-100 text-sage-900 border-sage-200',
      grey: 'bg-grey-100 text-grey-900 border-grey-200',
      almond: 'bg-almond-100 text-almond-900 border-almond-200'
    };

    const styleClasses = style === 'secondary' 
      ? 'border'
      : '';

    const baseClasses = 'inline-flex items-center gap-2 rounded-full font-medium transition-colors';

    const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${colorMap[color]} ${styleClasses} ${className}`.trim();

    return (
      <div
        ref={ref}
        className={combinedClasses}
        onClick={onClick}
        role="status"
        aria-label={label}
      >
        {showFlag && (
          <span className="inline-block w-2 h-2 rounded-full bg-current opacity-75" />
        )}
        {showIcon && icon && (
          <span className="inline-flex items-center justify-center">
            {icon}
          </span>
        )}
        <span>{label}</span>
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
