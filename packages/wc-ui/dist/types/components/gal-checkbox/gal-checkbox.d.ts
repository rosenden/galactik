import { EventEmitter } from '../../stencil-public-runtime';
export declare class GalCheckbox {
  el: HTMLElement;
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Indeterminate visual state (minus) */
  indeterminate: boolean;
  /** Disable interactions */
  disabled: boolean;
  /** Optional label text (fallback if no slot) */
  label?: string;
  /** Native input name */
  name?: string;
  /** Native input value */
  value?: string;
  isFocused: boolean;
  isKeyboardFocus: boolean;
  hasLabelSlot: boolean;
  galChange: EventEmitter<boolean>;
  galCheckedChange: EventEmitter<boolean>;
  galFocus: EventEmitter<FocusEvent>;
  galBlur: EventEmitter<FocusEvent>;
  private inputEl?;
  componentDidLoad(): void;
  componentDidUpdate(): void;
  onIndeterminateChange(): void;
  onCheckedChange(newValue: boolean): void;
  private syncIndeterminate;
  private get selectionState();
  private handleInputChange;
  private handleKeyDown;
  private handleMouseDown;
  private handleFocus;
  private handleBlur;
  private handleLabelSlotChange;
  render(): any;
}
