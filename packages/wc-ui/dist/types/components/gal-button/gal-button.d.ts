type ButtonVariant = 'filled' | 'outlined' | 'text';
type ButtonColorVariant = 'primary' | 'secondary' | 'light-accent' | 'accent';
type ButtonSize = 'small' | 'medium' | 'large';
export declare class GalButton {
  el: HTMLElement;
  /** Style variant of the button */
  variant: ButtonVariant;
  /** Color theme of the button */
  colorVariant: ButtonColorVariant;
  /** Size of the button */
  size: ButtonSize;
  /** If true, button is disabled */
  disabled: boolean;
  /** If true, shows loading spinner */
  loading: boolean;
  /** If true, button takes full width */
  fullWidth: boolean;
  /** HTML button type */
  type: 'button' | 'submit' | 'reset';
  /** If true, only shows icon without text */
  iconOnly: boolean;
  private hasIcons;
  render(): any;
}
export {};
