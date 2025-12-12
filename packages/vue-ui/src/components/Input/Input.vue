<template>
  <div 
    class="oc-input-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div :class="classes">
      <span v-if="iconLeft" class="oc-input__icon-left">
        <FontAwesomeIcon :icon="iconLeft" />
      </span>
      
      <input
        ref="inputRef"
        :type="type"
        :value="modelValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @mousedown="handleMouseDown"
        @keydown="handleKeyDown"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        :name="name"
        :id="id"
        :required="required"
        :aria-label="ariaLabel"
        class="oc-input__field"
      />
      
      <span v-if="showCounterDisplay" class="oc-input__counter">
        {{ counterText }}
      </span>
      
      <span 
        v-for="(icon, idx) in rightIconsArray" 
        :key="idx" 
        class="oc-input__icon-right"
      >
        <FontAwesomeIcon :icon="icon" />
      </span>
      
      <div 
        v-if="shouldShowNumberControls && !readonly" 
        :class="['oc-input__number-controls', `oc-input__number-controls--${size}`]"
      >
        <button
          type="button"
          @click="handleIncrement"
          :disabled="disabled"
          class="oc-input__number-button"
          aria-label="Increment"
        >
          <FontAwesomeIcon :icon="faChevronUp" />
        </button>
        <button
          type="button"
          @click="handleDecrement"
          :disabled="disabled"
          class="oc-input__number-button"
          aria-label="Decrement"
        >
          <FontAwesomeIcon :icon="faChevronDown" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './Input.css';

export type InputSize = 'small' | 'medium' | 'large';
export type InputVariant = 'default' | 'success' | 'error';
export type InputType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';

const props = withDefaults(defineProps<{
  /**
   * Input value (v-model)
   */
  modelValue?: string;
  /**
   * Placeholder text
   * @default 'Lorem ipsum'
   */
  placeholder?: string;
  /**
   * Input size
   * - small: 24px height
   * - medium: 36px height (default)
   * - large: 44px height
   * @default 'medium'
   */
  size?: InputSize;
  /**
   * Input variant
   * - default: standard input
   * - success: green styling
   * - error: red/cherry styling
   * @default 'default'
   */
  variant?: InputVariant;
  /**
   * Input type
   * @default 'text'
   */
  type?: InputType;
  /**
   * Left icon (FontAwesome)
   */
  iconLeft?: IconDefinition;
  /**
   * Right icon(s) (FontAwesome) - can be array for multiple icons
   */
  iconRight?: IconDefinition | IconDefinition[];
  /**
   * Show character counter
   * Format: "0/320"
   */
  maxLength?: number;
  /**
   * Show counter even without maxLength
   */
  showCounter?: boolean;
  /**
   * Show number controls (up/down chevrons) for number inputs
   * @default true for type="number"
   */
  showNumberControls?: boolean;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Whether the input is readonly
   */
  readonly?: boolean;
  /**
   * Name attribute
   */
  name?: string;
  /**
   * ID attribute
   */
  id?: string;
  /**
   * Required attribute
   */
  required?: boolean;
  /**
   * Aria label
   */
  ariaLabel?: string;
}>(), {
  modelValue: '',
  placeholder: 'Lorem ipsum',
  size: 'medium',
  variant: 'default',
  type: 'text',
  showCounter: false,
  showNumberControls: undefined,
  disabled: false,
  readonly: false,
  required: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const isHovered = ref(false);
const isKeyboardFocus = ref(false);

// Determine if we should show number controls
const shouldShowNumberControls = computed(() => 
  props.showNumberControls !== undefined 
    ? props.showNumberControls 
    : props.type === 'number'
);

// Determine states
const isEmpty = computed(() => !props.modelValue || props.modelValue.length === 0);
const isFilled = computed(() => !isEmpty.value);
// Active = clicked and typing (shows primary pressed border)
const isActive = computed(() => isFocused.value && !isKeyboardFocus.value);
// Focus = keyboard navigation only
const isFocusVisible = computed(() => isFocused.value && isKeyboardFocus.value);

// Build class names
const classes = computed(() => {
  const baseClass = 'oc-input';
  return [
    baseClass,
    `${baseClass}--${props.size}`,
    `${baseClass}--${props.variant}`,
    isEmpty.value && !isFocused.value ? `${baseClass}--empty` : '',
    isFilled.value && !isFocused.value && !isHovered.value ? `${baseClass}--filled` : '',
    isActive.value ? `${baseClass}--active` : '',
    isHovered.value && !isFocused.value ? `${baseClass}--hovered` : '',
    isFocusVisible.value ? `${baseClass}--focus` : '',
    props.readonly ? `${baseClass}--readonly` : '',
    props.disabled ? `${baseClass}--disabled` : '',
  ].filter(Boolean).join(' ');
});

// Character counter
const showCounterDisplay = computed(() => 
  (props.showCounter || props.maxLength) && !props.readonly
);

const counterText = computed(() => 
  props.maxLength 
    ? `${props.modelValue.length}/${props.maxLength}`
    : props.modelValue.length.toString()
);

// Prepare icon arrays
const rightIconsArray = computed(() => {
  if (!props.iconRight) return [];
  return Array.isArray(props.iconRight) ? props.iconRight : [props.iconRight];
});

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('change', target.value);
};

const handleFocus = (e: FocusEvent) => {
  isFocused.value = true;
  // Check if focus was triggered by keyboard (Tab key)
  const target = e.target as HTMLInputElement;
  isKeyboardFocus.value = target.matches(':focus-visible');
  emit('focus', e);
};

const handleBlur = (e: FocusEvent) => {
  isFocused.value = false;
  isKeyboardFocus.value = false;
  emit('blur', e);
};

const handleMouseDown = () => {
  // When clicking, it's not keyboard focus
  isKeyboardFocus.value = false;
};

const handleKeyDown = (e: KeyboardEvent) => {
  // When pressing Tab, it's keyboard focus
  if (e.key === 'Tab') {
    isKeyboardFocus.value = true;
  }
};

const handleMouseEnter = () => {
  if (!props.disabled) {
    isHovered.value = true;
  }
};

const handleMouseLeave = () => {
  isHovered.value = false;
};

const handleIncrement = () => {
  if (props.type === 'number' && !props.disabled && !props.readonly) {
    const num = parseFloat(props.modelValue || '0');
    const newValue = (num + 1).toString();
    emit('update:modelValue', newValue);
    emit('change', newValue);
  }
};

const handleDecrement = () => {
  if (props.type === 'number' && !props.disabled && !props.readonly) {
    const num = parseFloat(props.modelValue || '0');
    const newValue = (num - 1).toString();
    emit('update:modelValue', newValue);
    emit('change', newValue);
  }
};
</script>

<style scoped>
@import './Input.css';
</style>
