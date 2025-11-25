<template>
  <label
    :class="wrapperClasses"
    @keydown="handleKeyDown"
    @mousedown="handleMouseDown"
  >
    <input
      ref="inputRef"
      type="radio"
      class="oc-radio__input"
      :checked="checked"
      :disabled="disabled"
      :name="name"
      :value="value"
      :aria-checked="checked"
      @change="handleInputChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <span :class="radioClasses">
      <span class="oc-radio__outer" />
      <span class="oc-radio__dot" />
    </span>

    <span
      v-if="label"
      :class="['oc-radio__label', disabled ? 'oc-radio__label--disabled' : '']"
    >
      {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  /** Whether the radio is selected */
  checked?: boolean;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Optional label text */
  label?: string;
  /** Input name attribute */
  name?: string;
  /** Input value attribute */
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
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

const wrapperClasses = computed(() =>
  [
    'oc-radio-wrapper',
    props.disabled ? 'oc-radio-wrapper--disabled' : ''
  ]
    .filter(Boolean)
    .join(' ')
);

const radioClasses = computed(() =>
  [
    'oc-radio',
    props.checked ? 'oc-radio--checked' : '',
    props.disabled ? 'oc-radio--disabled' : '',
    isFocused.value && isKeyboardFocus.value ? 'oc-radio--focused' : ''
  ]
    .filter(Boolean)
    .join(' ')
);

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
/* Radio Component Styles - aligned with React implementation */
.oc-radio-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  position: relative;
  height: 24px;
}

.oc-radio-wrapper--disabled {
  cursor: not-allowed;
  opacity: 1;
}

.oc-radio__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.oc-radio {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: var(--stroke-xs) solid var(--color-font-primary-base);
  background-color: transparent;
  transition: all 0.15s ease;
  flex-shrink: 0;
  position: relative;
}

.oc-radio--checked {
  border-color: var(--color-stroke-primary-base);
}

.oc-radio--disabled {
  border-color: var(--color-font-neutral-disabled, #d1d1d1);
  background: var(--color-bg-neutral-disabled, #f5f5f5);
}

.oc-radio--focused {
  box-shadow: 0 0 0 2px var(--color-accent-primary-light, #e6f0ff);
}

.oc-radio__dot {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-stroke-primary-base);
  opacity: 0;
  transition: opacity 0.15s ease;
  position: absolute;
  left: 4px;
  top: 4px;
}

.oc-radio--checked .oc-radio__dot {
  opacity: 1;
}

.oc-radio--disabled .oc-radio__dot {
  background: var(--color-font-neutral-disabled, #d1d1d1);
}

.oc-radio__outer {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.oc-radio__label {
  margin-left: 4px;
  color: var(--color-font-primary-base);
  font-size: var(--font-size-body);
  user-select: none;
}

.oc-radio__label--disabled {
  color: var(--color-font-neutral-disabled, #d1d1d1);
}
</style>
