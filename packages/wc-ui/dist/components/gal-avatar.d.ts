import type { Components, JSX } from "../types/components";

interface GalAvatar extends Components.GalAvatar, HTMLElement {}
export const GalAvatar: {
  prototype: GalAvatar;
  new (): GalAvatar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
