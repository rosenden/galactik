type BadgeSize = 'xs' | 'sm' | 'lg';
type BadgeVariant = 'primary' | 'secondary';
type BadgeColor = 'sage' | 'almond' | 'pink' | 'grey' | 'info' | 'error' | 'success' | 'warning' | 'indigo' | 'yellow' | 'cherry' | 'cyan' | 'orange' | 'green' | 'blue' | 'red';
type BadgeMode = 'number' | 'icon';
export declare class GalBadge {
  /** Number to display */
  number?: number;
  /** Size of the badge */
  size: BadgeSize;
  /** Color variant */
  color: BadgeColor;
  /** Variant: primary (filled) or secondary (bordered) */
  variant: BadgeVariant;
  /** Mode: number or icon */
  mode: BadgeMode;
  /** Icon class (Font Awesome) */
  icon?: string;
  render(): any;
}
export {};
