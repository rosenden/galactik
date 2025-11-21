<template>
  <label
    :class="wrapperClasses"
    @keydown="handleKeyDown"
    @mousedown="handleMouseDown"
  >
    <input
      ref="inputRef"
      type="checkbox"
      class="oc-checkbox__input"
      :checked="checked"
      :disabled="disabled"
      :name="name"
      :value="value"
      :aria-checked="indeterminate ? 'mixed' : checked"
      @change="handleInputChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <div :class="checkboxClasses">
      <div class="oc-checkbox__icon">
        <svg
          v-if="selectionState !== 'unselected' && !indeterminate"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 8.5L6.5 11L12 5.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          v-else-if="selectionState === 'indeterminate'"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 8H12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>

    <span
      v-if="label"
      :class="[
        'oc-checkbox__label',
        disabled ? 'oc-checkbox__label--disabled' : ''
      ]"
    >
      {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

type CheckboxSelection = 'unselected' | 'selected' | 'indeterminate';

interface Props {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Indeterminate visual state (minus icon) */
  indeterminate?: boolean;
  /** Disable interactions */
  disabled?: boolean;
  /** Optional label text */
  label?: string;
  /** Input name */
  name?: string;
  /** Input value */
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  indeterminate: false,
  disabled: false
});

const emit = defineEmits<{
  'update:checked': [checked: boolean];
  change: [checked: boolean];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const isKeyboardFocus = ref(false);

watchEffect(() => {
  if (inputRef.value) {
    inputRef.value.indeterminate = props.indeterminate;
  }
});

const selectionState = computed<CheckboxSelection>(() => {
  if (props.indeterminate) return 'indeterminate';
  if (props.checked) return 'selected';
  return 'unselected';
});

const wrapperClasses = computed(() =>
  [
    'oc-checkbox-wrapper',
    props.disabled ? 'oc-checkbox-wrapper--disabled' : ''
  ]
    .filter(Boolean)
    .join(' ')
);

const checkboxClasses = computed(() => {
  const base = 'oc-checkbox';
  return [
    base,
    `${base}--${selectionState.value}`,
    props.disabled ? `${base}--disabled` : '',
    isFocused.value && isKeyboardFocus.value ? `${base}--focused` : ''
  ]
    .filter(Boolean)
    .join(' ');
});

const handleInputChange = (event: Event) => {
  if (props.disabled) return;
  const target = event.target as HTMLInputElement;
  emit('update:checked', target.checked);
  emit('change', target.checked);
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === ' ' && !props.disabled) {
    event.preventDefault();
    const next = !props.checked;
    emit('update:checked', next);
    emit('change', next);
  }
  isKeyboardFocus.value = true;
};

const handleMouseDown = () => {
  isKeyboardFocus.value = false;
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  isKeyboardFocus.value = false;
  emit('blur', event);
};
</script>

<style scoped>
/* Checkbox Component Styles - aligned with React implementation */
.oc-checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
  user-select: none;
  position: relative;
  height: 24px;
}

.oc-checkbox-wrapper--disabled {
  cursor: not-allowed;
  opacity: 1;
}

.oc-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.oc-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: var(--radius-xs);
  border: var(--stroke-xs) solid var(--color-font-primary-base);
  background-color: transparent;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.oc-checkbox__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 10px;
  color: var(--color-font-neutral-white);
  font-weight: 900;
  opacity: 1;
  transition: opacity 0.15s ease;
  overflow: hidden;
  font-size: 0;
  line-height: 0;
}

.oc-checkbox__icon svg {
  width: 100%;
  height: 100%;
  display: block;
}

.oc-checkbox--unselected .oc-checkbox__icon {
  opacity: 0;
}

.oc-checkbox__label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: 1;
  color: var(--color-font-neutral-base) !important;
  font-weight: var(--font-weight-regular);
}

.oc-checkbox__label--disabled {
  color: var(--color-font-neutral-muted) !important;
}

.oc-checkbox--selected,
.oc-checkbox--indeterminate {
  background-color: var(--color-bg-primary-base);
  border-color: var(--color-bg-primary-base);
}

.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):hover .oc-checkbox--unselected {
  background-color: var(--color-bg-primary-lighter);
  border-color: var(--color-font-primary-hovered);
}

.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):hover .oc-checkbox--selected,
.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):hover .oc-checkbox--indeterminate {
  background-color: var(--color-bg-primary-hovered);
  border-color: var(--color-bg-primary-hovered);
}

.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--unselected {
  background-color: var(--color-bg-primary-light);
  border-color: var(--color-stroke-primary-base);
}

.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--selected,
.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--indeterminate {
  background-color: var(--color-bg-primary-pressed);
  border-color: var(--color-bg-primary-pressed);
}

.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--selected .oc-checkbox__icon,
.oc-checkbox-wrapper:not(.oc-checkbox-wrapper--disabled):active .oc-checkbox--indeterminate .oc-checkbox__icon {
  color: var(--color-font-neutral-black);
}

.oc-checkbox--focused {
  outline: 2px solid var(--color-stroke-focus);
  outline-offset: 1px;
}

.oc-checkbox--disabled {
  background-color: var(--color-bg-neutral-disabled) !important;
  border-color: var(--color-border-base) !important;
  cursor: not-allowed;
}

.oc-checkbox--disabled.oc-checkbox--selected .oc-checkbox__icon,
.oc-checkbox--disabled.oc-checkbox--indeterminate .oc-checkbox__icon {
  color: var(--color-font-neutral-muted) !important;
}

.oc-checkbox--disabled.oc-checkbox--unselected {
  background-color: var(--color-bg-neutral-disabled) !important;
}
</style>
