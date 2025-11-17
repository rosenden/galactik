<template>
  <span class="gal-badge" :class="[`gal-badge--${size}`]" :style="badgeStyle">
    <span v-if="icon" class="gal-badge__icon material-symbols-rounded" aria-hidden="true">
      {{ icon }}
    </span>
    <span v-if="$slots.default && !hasNumber" class="gal-badge__label">
      <slot />
    </span>
    <span v-if="hasNumber" class="gal-badge__number">{{ number }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';

type BadgeSize = 'lg' | 'sm' | 'xs';
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
  | 'cyan';

const props = withDefaults(
  defineProps<{
    color?: BadgeColor;
    variant?: BadgeVariant;
    size?: BadgeSize;
    icon?: string;
    number?: string | number;
  }>(),
  {
    color: 'sage',
    variant: 'primary',
    size: 'lg',
    icon: undefined,
    number: undefined
  }
);

const hasNumber = computed(() => props.number !== undefined && props.number !== null && `${props.number}` !== '');

const colorTokens: Record<BadgeColor, { primary: Record<string, string>; secondary: Record<string, string> }> = {
  sage: {
    primary: { background: 'var(--color-bg-primary-base)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-primary-base)' },
    secondary: {
      background: 'var(--color-bg-primary-lightest)',
      color: 'var(--color-font-primary-base)',
      border: 'var(--color-stroke-primary-light)'
    }
  },
  almond: {
    primary: { background: 'var(--color-bg-secondary-base)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-secondary-base)' },
    secondary: {
      background: 'var(--color-bg-secondary-lightest)',
      color: 'var(--color-font-secondary-base)',
      border: 'var(--color-stroke-secondary-base)'
    }
  },
  pink: {
    primary: { background: 'var(--color-bg-accent-base)', color: 'var(--color-font-accent-muted)', border: 'var(--color-stroke-accent-base)' },
    secondary: {
      background: 'var(--color-bg-accent-hover)',
      color: 'var(--color-font-accent-base)',
      border: 'var(--color-stroke-accent-base)'
    }
  },
  grey: {
    primary: { background: 'var(--color-bg-neutral-base)', color: 'var(--color-font-neutral-base)', border: 'var(--color-stroke-neutral-dark)' },
    secondary: {
      background: 'var(--color-bg-neutral-white)',
      color: 'var(--color-font-neutral-muted)',
      border: 'var(--color-stroke-neutral-disabled)'
    }
  },
  info: {
    primary: { background: 'var(--color-bg-info-base-alt)', color: 'var(--color-font-info-base)', border: 'var(--color-stroke-info-base)' },
    secondary: {
      background: 'var(--color-bg-info-base)',
      color: 'var(--color-font-info-base)',
      border: 'var(--color-stroke-info-base)'
    }
  },
  error: {
    primary: { background: 'var(--color-bg-error-base-alt)', color: 'var(--color-font-error-base)', border: 'var(--color-stroke-error-base)' },
    secondary: {
      background: 'var(--color-bg-error-base)',
      color: 'var(--color-font-error-base)',
      border: 'var(--color-stroke-error-base)'
    }
  },
  success: {
    primary: { background: 'var(--color-bg-success-base-alt)', color: 'var(--color-font-success-base)', border: 'var(--color-stroke-success-base)' },
    secondary: {
      background: 'var(--color-bg-success-base)',
      color: 'var(--color-font-success-base)',
      border: 'var(--color-stroke-success-base)'
    }
  },
  warning: {
    primary: { background: 'var(--color-bg-warning-base-alt)', color: 'var(--color-font-warning-base)', border: 'var(--color-stroke-warning-base)' },
    secondary: {
      background: 'var(--color-bg-warning-base)',
      color: 'var(--color-font-warning-base)',
      border: 'var(--color-stroke-warning-base)'
    }
  },
  indigo: {
    primary: { background: 'var(--color-bg-indigo-base)', color: 'var(--color-font-neutral-white)', border: 'var(--color-stroke-indigo-base)' },
    secondary: {
      background: 'var(--color-bg-indigo-base-alt)',
      color: 'var(--color-font-indigo-base)',
      border: 'var(--color-stroke-indigo-base)'
    }
  },
  yellow: {
    primary: { background: 'var(--color-bg-yellow-base)', color: 'var(--color-font-yellow-base)', border: 'var(--color-stroke-yellow-base)' },
    secondary: {
      background: 'var(--color-bg-yellow-base-alt)',
      color: 'var(--color-font-yellow-base)',
      border: 'var(--color-stroke-yellow-base)'
    }
  },
  cherry: {
    primary: { background: 'var(--color-bg-cherry-base-alt)', color: 'var(--color-font-cherry-base)', border: 'var(--color-stroke-cherry-base)' },
    secondary: {
      background: 'var(--color-bg-cherry-base)',
      color: 'var(--color-font-cherry-base)',
      border: 'var(--color-stroke-cherry-base)'
    }
  },
  cyan: {
    primary: { background: 'var(--color-bg-cyan-base)', color: 'var(--color-font-cyan-base)', border: 'var(--color-stroke-cyan-base)' },
    secondary: {
      background: 'var(--color-bg-cyan-base-alt)',
      color: 'var(--color-font-cyan-base)',
      border: 'var(--color-stroke-cyan-base)'
    }
  }
};

const sizeTokens: Record<BadgeSize, { padding: string; fontSize: string }> = {
  lg: { padding: '0 var(--space-md)', fontSize: 'var(--font-size-base)' },
  sm: { padding: '0 var(--space-sm)', fontSize: 'var(--font-size-sm)' },
  xs: { padding: '0 var(--space-2xs)', fontSize: 'var(--font-size-xs)' }
};

const palette = computed(() => colorTokens[props.color] ?? colorTokens.sage);

const badgeStyle = computed(() => {
  const variant = props.variant === 'secondary' ? palette.value.secondary : palette.value.primary;
  const size = sizeTokens[props.size];
  return {
    background: variant.background,
    color: variant.color,
    borderColor: variant.border,
    padding: size.padding,
    fontSize: size.fontSize
  };
});
</script>

<style scoped>
.gal-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs);
  border-radius: var(--radius-rounded);
  border: var(--stroke-xs) solid transparent;
  font-weight: var(--font-weight-semibold);
  line-height: 1;
}

.gal-badge__icon {
  font-size: 1em;
  line-height: 1;
}

.gal-badge__number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.gal-badge--lg .gal-badge__icon {
  font-size: var(--font-size-lg);
}

.gal-badge--xs .gal-badge__icon {
  font-size: var(--font-size-xs);
}
</style>
