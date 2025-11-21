<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="oc-button__spinner" aria-hidden="true">
      <i class="fa-solid fa-spinner oc-button__spinner-icon"></i>
    </span>
    <span v-if="!loading && iconLeft" class="oc-button__icon oc-button__icon--left">
      <i :class="iconLeft"></i>
    </span>
    <span v-if="!iconOnly && $slots.default" class="oc-button__label">
      <slot></slot>
    </span>
    <template v-if="iconOnly && !loading">
      <slot></slot>
    </template>
    <span v-if="!loading && iconRight" class="oc-button__icon oc-button__icon--right">
      <i :class="iconRight"></i>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type ButtonVariant = 'filled' | 'outlined' | 'text';
export type ButtonColorVariant = 'primary' | 'secondary' | 'light-accent' | 'accent';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';

interface Props {
  /** Style variant of the button */
  variant?: ButtonVariant;
  /** Color theme of the button */
  colorVariant?: ButtonColorVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Icon class to display on the left side (e.g., 'fa-solid fa-play') */
  iconLeft?: string;
  /** Icon class to display on the right side (e.g., 'fa-solid fa-arrow-right') */
  iconRight?: string;
  /** If true, only shows icon without text */
  iconOnly?: boolean;
  /** If true, button is disabled */
  disabled?: boolean;
  /** If true, shows loading spinner */
  loading?: boolean;
  /** If true, button takes full width of container */
  fullWidth?: boolean;
  /** HTML button type */
  type?: ButtonType;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  colorVariant: 'primary',
  size: 'medium',
  iconOnly: false,
  disabled: false,
  loading: false,
  fullWidth: false,
  type: 'button'
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
  const baseClass = 'oc-button';
  return [
    baseClass,
    `${baseClass}--${props.variant}`,
    `${baseClass}--${props.colorVariant}`,
    `${baseClass}--${props.size}`,
    props.iconOnly ? `${baseClass}--icon-only` : '',
    props.fullWidth ? `${baseClass}--full-width` : '',
    props.loading ? `${baseClass}--loading` : ''
  ].filter(Boolean).join(' ');
});

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  emit('click', event);
};
</script>

<style scoped>
.oc-button {
  /* Styles handled via global design tokens and shared React classes */
}
</style>
