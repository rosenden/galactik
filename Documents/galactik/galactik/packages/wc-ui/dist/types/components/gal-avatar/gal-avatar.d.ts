type Size = 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'primaryLight' | 'secondary' | 'accent' | 'accentSoft' | 'cherry' | 'success' | 'warning' | 'info' | 'error' | 'indigo' | 'indigoAlt' | 'neutralDark' | 'yellow' | 'cyan';
type Status = 'online' | 'away' | 'busy' | 'offline' | 'none';
export declare class GalAvatar {
  /** Nom complet utilisé pour générer les initiales */
  name: string;
  /** URL de l’image */
  src?: string;
  /** Texte alternatif personnalisé */
  alt?: string;
  /** Taille du composant */
  size: Size;
  /** Variante sémantique */
  variant: Variant;
  /** Statut affiché dans la pastille */
  status: Status;
  private getInitials;
  private getAlt;
  render(): any;
}
export {};
