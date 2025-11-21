<template>
  <span
    :class="badgeClasses"
    :style="badgeStyle"
    role="status"
    :aria-label="ariaLabel"
  >
    <span v-if="computedMode === 'icon' && icon" class="qa-badge__icon" aria-hidden="true">
      <component :is="icon" v-if="typeof icon !== 'string'" />
      <i v-else :class="icon" />
    </span>
    <span v-else-if="computedMode === 'number' || computedMode === 'text'" class="qa-badge__label">
      {{ labelText }}
    </span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

/**
 * Badge Component - Synchronized with Figma Design System via MCP
 * ISO with React implementation
 */

type BadgeSize = 'xs' | 'sm' | 'lg' | 'small' | 'medium' | 'large';
type BadgeVariant = 'primary' | 'secondary';
type BadgeColor =
  | 'sage'
  | 'almond'
  | 'pink'
  | 'grey'
  | 'info'
  | 'error'
  | 'success'
  | 'warning'
  | 'indigo'
  | 'yellow'
  | 'cherry'
  | 'cyan'
  | 'orange'
  | 'green'
  | 'blue'
  | 'red';

type BadgeMode = 'icon' | 'number' | 'text';

interface Props {
  label?: number | string;
  size?: BadgeSize;
  color?: BadgeColor;
  variant?: BadgeVariant;
  showIcon?: boolean;
  icon?: any;
  mode?: BadgeMode;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
  color: 'sage',
  variant: 'primary',
  showIcon: false,
  mode: 'text'
});

// Size tokens - ISO with React
const sizeTokens: Record<'xs' | 'sm' | 'lg', { padding: string; fontSize: string }> = {
  xs: { padding: '0', fontSize: '10px' },  // 18px badge
  sm: { padding: '0', fontSize: '12px' },  // 24px badge
  lg: { padding: '0', fontSize: '14px' }   // 36px badge
};

// Color tokens - ISO with React
const colorTokens: Record<
  Exclude<BadgeColor, 'orange' | 'green' | 'blue' | 'red'>,
  { primary: Record<'background' | 'color' | 'border', string>; secondary: Record<'background' | 'color' | 'border', string> }
> = {
  sage: {
    primary: { background: 'var(--color-bg-primary-base)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-primary-base)' },
    secondary: { background: 'var(--color-bg-primary-lightest)', color: 'var(--color-font-primary-base)', border: 'var(--color-stroke-primary-light)' }
  },
  almond: {
    primary: { background: 'var(--color-bg-secondary-base)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-secondary-base)' },
    secondary: { background: 'var(--color-bg-secondary-lightest)', color: 'var(--color-font-secondary-base)', border: 'var(--color-stroke-secondary-base)' }
  },
  pink: {
    primary: { background: 'var(--color-bg-accent-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-accent-base)' },
    secondary: { background: 'var(--color-bg-accent-hover)', color: 'var(--color-font-accent-base)', border: 'var(--color-stroke-accent-base)' }
  },
  grey: {
    primary: { background: 'var(--color-bg-neutral-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-neutral-dark)' },
    secondary: { background: 'var(--color-bg-neutral-disabled)', color: 'var(--color-font-neutral-muted)', border: 'var(--color-stroke-neutral-disabled)' }
  },
  info: {
    primary: { background: 'var(--color-bg-info-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-info-base)' },
    secondary: { background: 'var(--color-bg-info-base)', color: 'var(--color-font-info-base)', border: 'var(--color-stroke-info-base)' }
  },
  error: {
    primary: { background: 'var(--color-bg-error-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-error-base)' },
    secondary: { background: 'var(--color-bg-error-base)', color: 'var(--color-font-error-base)', border: 'var(--color-stroke-error-base)' }
  },
  success: {
    primary: { background: 'var(--color-bg-success-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-success-base)' },
    secondary: { background: 'var(--color-bg-success-base)', color: 'var(--color-font-success-base)', border: 'var(--color-stroke-success-base)' }
  },
  warning: {
    primary: { background: 'var(--color-bg-warning-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-warning-base)' },
    secondary: { background: 'var(--color-bg-warning-base)', color: 'var(--color-font-warning-base)', border: 'var(--color-stroke-warning-base)' }
  },
  indigo: {
    primary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-indigo-base)' },
    secondary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-indigo-base)', border: 'var(--color-stroke-indigo-base)' }
  },
  yellow: {
    primary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-yellow-base)' },
    secondary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-yellow-base)', border: 'var(--color-stroke-yellow-base)' }
  },
  cherry: {
    primary: { background: 'var(--color-bg-cherry-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-cherry-base)' },
    secondary: { background: 'var(--color-bg-cherry-base)', color: 'var(--color-font-cherry-base)', border: 'var(--color-stroke-cherry-base)' }
  },
  cyan: {
    primary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-cyan-base)' },
    secondary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-cyan-base)', border: 'var(--color-stroke-cyan-base)' }
  }
};

const colorAliases: Partial<Record<BadgeColor, keyof typeof colorTokens>> = {
  orange: 'warning',
  green: 'success',
  blue: 'info',
  red: 'error'
};

const normalizeSize = (size: BadgeSize): 'xs' | 'sm' | 'lg' => {
  switch (size) {
    case 'xs':
    case 'small':
      return 'xs';
    case 'sm':
    case 'medium':
      return 'sm';
    case 'lg':
    case 'large':
    default:
      return 'lg';
  }
};

const resolvedSize = computed(() => normalizeSize(props.size));
const paletteKey = computed(() => colorAliases[props.color] ?? props.color);
const palette = computed(() => colorTokens[paletteKey.value as keyof typeof colorTokens] ?? colorTokens.sage);
const variantTokens = computed(() => props.variant === 'secondary' ? palette.value.secondary : palette.value.primary);
const sizing = computed(() => sizeTokens[resolvedSize.value]);

const badgeClasses = computed(() => [
  'qa-badge',
  `qa-badge--${resolvedSize.value}`
]);

const labelText = computed(() => props.label !== undefined ? String(props.label) : undefined);
const ariaLabel = computed(() => labelText.value ?? 'badge');
const computedMode = computed(() => props.mode);

const badgeStyle = computed(() => {
  const baseStyle: Record<string, string> = {
    background: variantTokens.value.background,
    color: variantTokens.value.color,
    padding: sizing.value.padding,
    'font-size': sizing.value.fontSize
  };

  return baseStyle;
});
</script>

<style scoped>
.qa-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 9999px;
  border: 0;
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  box-sizing: border-box;
  aspect-ratio: 1 / 1;
}

.qa-badge__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  line-height: 1;
}

.qa-badge__label {
  display: inline-flex;
  align-items: center;
}

/* Sizes: fixed pixel dimensions for circular badges */
.qa-badge--xs { 
  width: 18px; 
  height: 18px; 
  font-size: 10px;
}
.qa-badge--sm { 
  width: 24px; 
  height: 24px; 
  font-size: 12px;
}
.qa-badge--lg { 
  width: 36px; 
  height: 36px; 
  font-size: 14px;
}
</style>
