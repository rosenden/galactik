type Size = 'small' | 'medium' | 'large';
type AvatarVariant = 'primary' | 'secondary';
type AvatarColor = 'sage' | 'almond' | 'pink' | 'grey' | 'info' | 'error' | 'success' | 'warning' | 'indigo' | 'yellow' | 'cherry' | 'cyan' | 'orange' | 'green' | 'blue' | 'red';
type Status = 'online' | 'away' | 'busy' | 'offline' | 'none';
export declare class GalAvatar {
  /** Nom complet utilisé pour générer les initiales */
  name: string;
  /** URL de l'image */
  src?: string;
  /** Font Awesome icon class (ex: "fas fa-user") */
  icon?: string;
  /** Texte alternatif personnalisé */
  alt?: string;
  /** Taille du composant */
  size: Size;
  /** Variant: primary or secondary */
  variant: AvatarVariant;
  /** Avatar color (semantic tokens) */
  avatarColor: AvatarColor;
  /** Statut affiché dans la pastille */
  status: Status;
  private getInitials;
  private getAlt;
  render(): any;
}
export {};
