<template>
  <span :class="classes">
    <!-- iconLeft: support both FontAwesome icon defs and string class names -->
    <FontAwesomeIcon
      v-if="iconLeft && !iconLeftIsString"
      :icon="iconLeft"
      class="oc-tag__icon oc-tag__icon--left"
      aria-hidden="true"
    />
    <i
      v-else-if="iconLeft && iconLeftIsString"
      :class="iconLeft"
      class="oc-tag__icon oc-tag__icon--left"
      aria-hidden="true"
    ></i>

    <span v-if="flag" :class="['flag','flag-'+flag.toLowerCase(), 'oc-tag__flag']" aria-hidden="true"></span>

    <span class="oc-tag__label"><slot /></span>

    <FontAwesomeIcon
      v-if="iconRight && !iconRightIsString"
      :icon="iconRight"
      class="oc-tag__icon oc-tag__icon--right"
      aria-hidden="true"
    />
    <i
      v-else-if="iconRight && iconRightIsString"
      :class="iconRight"
      class="oc-tag__icon oc-tag__icon--right"
      aria-hidden="true"
    ></i>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './Tag.css';

type TagColor = 'sage'|'pink'|'almond'|'grey'|'yellow'|'warning'|'cherry'|'success'|'indigo'|'info'|'cyan'|'error';
type TagVariant = 'fill'|'outline';
type TagSize = 'xsmall'|'small'|'medium';

const props = withDefaults(defineProps<{
  color?: TagColor;
  variant?: TagVariant;
  size?: TagSize;
  // allow either FontAwesome icon def (object) or a string class name
  iconLeft?: any | null;
  iconRight?: any | null;
  flag?: string | null;
}>(), {
  color: 'sage',
  variant: 'fill',
  size: 'small',
  iconLeft: null,
  iconRight: null,
  flag: null,
});

const classes = computed(() => {
  const base = 'oc-tag';
  return [base, `${base}--${props.variant}`, `${base}--${props.color}`, `${base}--${props.size}`];
});

const iconLeftIsString = computed(() => typeof props.iconLeft === 'string');
const iconRightIsString = computed(() => typeof props.iconRight === 'string');

// expose FontAwesomeIcon for template usage (imported binding is usable in <script setup>)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _FontAwesomeIcon = FontAwesomeIcon;
</script>

