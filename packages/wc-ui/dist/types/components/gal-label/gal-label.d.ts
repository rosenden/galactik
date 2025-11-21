type LabelSize = 'small' | 'medium';
type LabelColor = 'sage' | 'black' | 'success' | 'error' | 'warning' | 'info';
export declare class GalLabel {
  el: HTMLElement;
  /** Text rendered inside the label (fallback when no slot) */
  text: string;
  /** Label size */
  size: LabelSize;
  /** Palette aligned with the React implementation */
  color: LabelColor;
  /** Optional Font Awesome class for the icon */
  icon?: string;
  hasIconSlot: boolean;
  hasTextSlot: boolean;
  private handleIconSlotChange;
  private handleTextSlotChange;
  private hasProjectedIcon;
  private hasDefaultTextNodes;
  private shouldLoadFontAwesome;
  render(): any;
}
export {};
