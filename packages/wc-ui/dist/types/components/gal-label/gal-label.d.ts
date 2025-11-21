type LabelSize = 'small' | 'medium';
type LabelColor = 'sage' | 'black' | 'success' | 'error' | 'warning' | 'info';
export declare class GalLabel {
  el: HTMLElement;
  /** Texte affiché dans le label (fallback si aucun slot) */
  text: string;
  /** Taille du label */
  size: LabelSize;
  /** Palette alignée sur la version React */
  color: LabelColor;
  /** Classe Font Awesome optionnelle pour l’icône */
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
