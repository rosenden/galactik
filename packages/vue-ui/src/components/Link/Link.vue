<template>
  <a
    :href="disabled ? undefined : href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :class="classes"
    @click="onClickHandler"
    :aria-disabled="disabled ? 'true' : 'false'"
  >
    <span class="oc-link__label"><slot /></span>
    <FontAwesomeIcon
      v-if="icon && !iconIsString && !disabled"
      :icon="icon"
      class="oc-link__icon"
      aria-hidden="true"
    />
    <i
      v-else-if="icon && iconIsString && !disabled"
      :class="icon"
      class="oc-link__icon"
      aria-hidden="true"
    ></i>
  </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowUpRight } from '@fortawesome/pro-regular-svg-icons';
import './Link.css';

const props = withDefaults(defineProps<{
  href: string;
  size?: 'sm'|'md'|'lg';
  icon?: any | null;
  disabled?: boolean;
  visited?: boolean;
  active?: boolean;
  target?: string | null;
  className?: string | null;
}>(), {
  href: '#',
  size: 'md',
  icon: faArrowUpRight,
  disabled: false,
  visited: false,
  active: false,
  target: null,
  className: null,
});

const emit = defineEmits(['click']);

const classes = computed(() => [
  'oc-link',
  `oc-link--${props.size}`,
  props.visited ? 'oc-link--visited' : '',
  props.active ? 'oc-link--active' : '',
  props.disabled ? 'oc-link--disabled' : '',
  props.className || ''
].filter(Boolean).join(' '));

const iconIsString = computed(() => typeof props.icon === 'string');

function onClickHandler(e: Event) {
  if (props.disabled) {
    e.preventDefault();
    return;
  }
  emit('click', e);
}
</script>
