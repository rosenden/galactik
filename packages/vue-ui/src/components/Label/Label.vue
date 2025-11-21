<template>
  <span :class="labelClasses">
    <span v-if="icon" class="oc-label__icon" aria-hidden="true">
      <component v-if="typeof icon !== 'string'" :is="icon" />
      <i v-else :class="icon" />
    </span>
    <span class="oc-label__text">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type LabelSize = 'small' | 'medium';
type LabelColor = 'sage' | 'black' | 'success' | 'error' | 'warning' | 'info';

interface Props {
  /** Text content displayed inside the label */
  text: string;
  /** Size variant that aligns with the React implementation */
  size?: LabelSize;
  /** Semantic color token to use */
  color?: LabelColor;
  /** Optional icon component or class name rendered before the text */
  icon?: any;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  color: 'sage'
});

const labelClasses = computed(() => {
  const baseClass = 'oc-label';
  return [
    baseClass,
    `${baseClass}--${props.size}`,
    `${baseClass}--${props.color}`,
    `${baseClass}--default`
  ]
    .filter(Boolean)
    .join(' ');
});
</script>

<style scoped>
/* Label Component Styles - Synchronized with Figma Design System */
.oc-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-base, 'Inter', system-ui, -apple-system, sans-serif);
  font-weight: 600;
  box-sizing: border-box;
  vertical-align: middle;
  white-space: nowrap;
}

.oc-label__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--icon-md);
  height: var(--icon-md);
}

.oc-label__icon svg {
  width: 100%;
  height: 100%;
  display: block;
}

.oc-label__text {
  display: inline-block;
}

/* SIZE VARIANTS */
.oc-label--small {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-2);
  font-weight: var(--font-weight-semibold);
  gap: var(--space-3xs);
}

.oc-label--medium {
  font-size: var(--font-size-base);
  line-height: var(--line-height-4);
  font-weight: var(--font-weight-semibold);
  gap: var(--space-3xs);
}

/* COLOR VARIANTS */
.oc-label.oc-label--sage.oc-label--default {
  color: var(--color-font-primary-base) !important;
}

.oc-label.oc-label--black.oc-label--default {
  color: var(--color-font-neutral-base) !important;
}

.oc-label.oc-label--success.oc-label--default {
  color: var(--color-font-success-muted) !important;
}

.oc-label.oc-label--error.oc-label--default {
  color: var(--color-font-error-muted) !important;
}

.oc-label.oc-label--warning.oc-label--default {
  color: var(--color-font-warning-muted) !important;
}

.oc-label.oc-label--info.oc-label--default {
  color: var(--color-font-info-muted) !important;
}
</style>
