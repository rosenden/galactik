import type { Components, JSX } from "../types/components";

interface GalCheckbox extends Components.GalCheckbox, HTMLElement {}
export const GalCheckbox: {
  prototype: GalCheckbox;
  new (): GalCheckbox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
