type Size = 'small' | 'medium' | 'large';
type AvatarVariant = 'primary' | 'secondary';
type AvatarColor = 'sage' | 'almond' | 'pink' | 'grey' | 'info' | 'error' | 'success' | 'warning' | 'indigo' | 'yellow' | 'cherry' | 'cyan' | 'orange' | 'green' | 'blue' | 'red';
type Status = 'online' | 'away' | 'busy' | 'offline' | 'none';
export declare class GalAvatar {
  /** Full name used to generate initials */
  name: string;
  /** Image URL */
  src?: string;
  /** Font Awesome icon class (ex: "fas fa-user") */
  icon?: string;
  /** Custom alt text */
  alt?: string;
  /** Component size */
  size: Size;
  /** Variant: primary or secondary */
  variant: AvatarVariant;
  /** Avatar color (semantic tokens) */
  avatarColor: AvatarColor;
  /** Status displayed in the badge */
  status: Status;
  private getInitials;
  private getAlt;
  render(): any;
}
export {};
