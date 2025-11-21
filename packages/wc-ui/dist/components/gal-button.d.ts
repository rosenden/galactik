import type { Components, JSX } from "../types/components";

interface GalButton extends Components.GalButton, HTMLElement {}
export const GalButton: {
  prototype: GalButton;
  new (): GalButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
