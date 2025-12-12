<template>
  <div class="oc-select-container">
    <button
      ref="trigger"
      :class="classes"
      type="button"
      :disabled="disabled"
      @click="toggle"
      @keydown.down.prevent="onArrowDown"
      @keydown.up.prevent="onArrowUp"
      @keydown.enter.prevent="onEnter"
      @keydown.space.prevent="onEnter"
      @keydown.esc="onEscape"
      @focus="onFocus"
      @blur="onBlur"
      aria-haspopup="listbox"
      :aria-expanded="isOpen.toString()"
      :aria-disabled="disabled ? 'true' : 'false'"
      :aria-readonly="readonly ? 'true' : 'false'"
      role="combobox"
    >
      <span v-if="icon" class="oc-select__icon-left">
        <FontAwesomeIcon 
          v-if="icon && !iconIsString" 
          :icon="icon" 
          aria-hidden="true" 
        />
        <i 
          v-else-if="icon && iconIsString" 
          :class="icon" 
          aria-hidden="true"
        ></i>
      </span>
      
      <span class="oc-select__text">{{ displayText }}</span>
      
      <span v-if="!readonly" class="oc-select__chevron">
        <FontAwesomeIcon 
          :icon="isOpen ? faChevronUp : faChevronDown" 
          aria-hidden="true" 
        />
      </span>
    </button>

    <div
      v-if="isOpen && !disabled && !readonly"
      ref="list"
      class="oc-select-dropdown"
      role="listbox"
      aria-label="Select options"
    >
      <div
        v-for="(opt, idx) in options"
        :key="opt.value"
        :id="`oc-select-option-${idx}`"
        role="option"
        :aria-selected="opt.value === modelValue"
        :class="[
          'oc-select-option', 
          { 
            'oc-select-option--highlighted': highlightedIndex === idx, 
            'oc-select-option--selected': opt.value === modelValue 
          }
        ]"
        @click.stop.prevent="onOptionClick(opt.value)"
        @mousedown.prevent
        @mouseenter="highlightedIndex = idx"
      >
        {{ opt.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
}

const props = withDefaults(defineProps<{
  options: SelectOption[];
  modelValue?: string;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  icon?: any | null;
  disabled?: boolean;
  readonly?: boolean;
}>(), {
  options: () => [],
  modelValue: '',
  placeholder: 'Lorem ipsum dolor',
  size: 'medium',
  icon: null,
  disabled: false,
  readonly: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
}>();

const isOpen = ref(false);
const isFocused = ref(false);
const highlightedIndex = ref<number | null>(null);
const trigger = ref<HTMLElement | null>(null);
const list = ref<HTMLElement | null>(null);

const displayText = computed(() => {
  const sel = props.options.find(o => o.value === props.modelValue);
  return sel ? sel.label : props.placeholder;
});

const iconIsString = computed(() => typeof props.icon === 'string');

const isEmpty = computed(() => !props.modelValue);
const isFilled = computed(() => !!props.modelValue && !isOpen.value);
const isActive = computed(() => isOpen.value);

const classes = computed(() => {
  const base = 'oc-select';
  return [
    base,
    `${base}--${props.size}`,
    isEmpty.value && !isOpen.value && !isFocused.value && `${base}--empty`,
    isActive.value && `${base}--active`,
    isFilled.value && !isFocused.value && `${base}--filled`,
    isFocused.value && !props.disabled && !props.readonly && `${base}--focus`,
    props.disabled && `${base}--disabled`,
    props.readonly && `${base}--readonly`,
  ].filter(Boolean).join(' ');
});

const toggle = () => {
  if (props.disabled || props.readonly) return;
  isOpen.value = !isOpen.value;
};

const onOptionClick = (val: string) => {
  emit('update:modelValue', val);
  emit('change', val);
  isOpen.value = false;
};

const onFocus = () => { 
  if (!props.disabled && !props.readonly) {
    isFocused.value = true;
  }
};

const onBlur = () => { 
  isFocused.value = false; 
};

const onArrowDown = () => {
  if (!isOpen.value) { 
    isOpen.value = true; 
    highlightedIndex.value = 0; 
    return; 
  }
  highlightedIndex.value = highlightedIndex.value === null 
    ? 0 
    : Math.min(props.options.length - 1, highlightedIndex.value + 1);
  scrollHighlightedIntoView();
};

const onArrowUp = () => {
  if (!isOpen.value) { 
    isOpen.value = true; 
    highlightedIndex.value = props.options.length - 1; 
    return; 
  }
  highlightedIndex.value = highlightedIndex.value === null 
    ? props.options.length - 1 
    : Math.max(0, highlightedIndex.value - 1);
  scrollHighlightedIntoView();
};

const onEnter = () => {
  if (!isOpen.value) { 
    isOpen.value = true; 
    highlightedIndex.value = props.options.findIndex(o => o.value === props.modelValue) || 0; 
    return; 
  }
  if (highlightedIndex.value !== null) {
    const opt = props.options[highlightedIndex.value];
    onOptionClick(opt.value);
  }
};

const onEscape = () => { 
  isOpen.value = false; 
  highlightedIndex.value = null; 
  (trigger.value as HTMLElement | null)?.focus(); 
};

const scrollHighlightedIntoView = () => {
  if (highlightedIndex.value === null || !list.value) return;
  const el = list.value.querySelector(`#oc-select-option-${highlightedIndex.value}`) as HTMLElement | null;
  el?.scrollIntoView({ block: 'nearest' });
};

const onDocClick = (e: MouseEvent) => {
  const t = e.target as Node | null;
  if (!t) return;
  if (isOpen.value) {
    if (trigger.value && trigger.value.contains(t)) return;
    if (list.value && list.value.contains(t)) return;
    isOpen.value = false;
    highlightedIndex.value = null;
  }
};

onMounted(() => document.addEventListener('mousedown', onDocClick));
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocClick));

watch(isOpen, (val) => {
  if (val) {
    const selIdx = props.options.findIndex(o => o.value === props.modelValue);
    highlightedIndex.value = selIdx >= 0 ? selIdx : 0;
    setTimeout(scrollHighlightedIntoView, 0);
  } else {
    highlightedIndex.value = null;
  }
});
</script>