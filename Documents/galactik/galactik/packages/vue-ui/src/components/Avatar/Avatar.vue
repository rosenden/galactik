<template>
  <div
    class="gal-avatar"
    :class="['gal-avatar--' + props.size, 'gal-avatar--' + props.variant]"
    :style="avatarStyle"
    role="img"
    :aria-label="altText"
  >
    <template v-if="props.variant === 'picture'">
      <div class="gal-avatar__clip">
        <template v-if="hasImage">
          <img :src="props.img" :alt="altText" />
        </template>
        <span v-else class="gal-avatar__initials">{{ displayLabel }}</span>
      </div>
    </template>
    <template v-else-if="props.variant === 'icon'">
      <div class="gal-avatar__fa">
        <FontAwesomeIcon :icon="iconLookup" />
      </div>
    </template>
    <template v-else>
      <span class="gal-avatar__initials">{{ displayLabel }}</span>
    </template>
    <slot name="status" />
  </div>
</template>

<script lang="ts" setup>
import type { NeutralColor, PrimaryColor, SemanticColor, Size } from '@/types';
import type { IconDefinition, IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, withDefaults, defineProps } from 'vue';

const farIcons = Object.values(far).filter(
  (icon): icon is IconDefinition => typeof icon === 'object' && icon !== null && 'iconName' in icon
);
library.add(...farIcons);

interface Props {
  label?: string;
  variant?: 'primary' | 'secondary' | 'picture' | 'icon';
  color?: PrimaryColor | SemanticColor | NeutralColor;
  size?: Extract<Size, 'lg' | 'md' | 'sm' | 'xs'>;
  img?: string;
  alt?: string;
  icon?: IconName;
  iconStyle?: IconPrefix;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'lg',
  color: 'sage',
  icon: 'user',
  iconStyle: 'far'
});

const sizeMap: Record<Props['size'], { dimension: string; fontSize: string; lineHeight: string }> = {
  lg: { dimension: '44px', fontSize: 'var(--font-size-lg)', lineHeight: 'var(--line-height-4)' },
  md: { dimension: '36px', fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-3)' },
  sm: { dimension: '24px', fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-2)' },
  xs: { dimension: '18px', fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-2)' }
};

type ColorTokens = {
  primary: { background: string; color: string };
  secondary: { background: string; color: string };
};

const colorTokens: Record<string, ColorTokens> = {
  sage: {
    primary: { background: 'var(--color-bg-primary-base)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-primary-light)', color: 'var(--color-font-primary-base)' }
  },
  almond: {
    primary: { background: 'var(--color-bg-secondary-base)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-secondary-light)', color: 'var(--color-font-secondary-base)' }
  },
  pink: {
    primary: { background: 'var(--color-bg-accent-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-accent-base)', color: 'var(--color-font-accent-base)' }
  },
  grey: {
    primary: { background: 'var(--color-bg-neutral-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-neutral-disabled)', color: 'var(--color-font-neutral-base)' }
  },
  info: {
    primary: { background: 'var(--color-bg-info-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-info-base)', color: 'var(--color-font-info-base)' }
  },
  error: {
    primary: { background: 'var(--color-bg-error-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-error-base)', color: 'var(--color-font-error-base)' }
  },
  success: {
    primary: { background: 'var(--color-bg-success-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-success-base)', color: 'var(--color-font-success-base)' }
  },
  warning: {
    primary: { background: 'var(--color-bg-warning-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-warning-base)', color: 'var(--color-font-warning-base)' }
  },
  indigo: {
    primary: { background: 'var(--color-bg-indigo-base)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-indigo-base)' }
  },
  yellow: {
    primary: { background: 'var(--color-bg-yellow-base)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-yellow-base)' }
  },
  cherry: {
    primary: { background: 'var(--color-bg-cherry-base)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-cherry-base-alt)', color: 'var(--color-font-cherry-base)' }
  },
  cyan: {
    primary: { background: 'var(--color-bg-cyan-base)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-cyan-base)' }
  }
};

const getPalette = (color: string): ColorTokens =>
  colorTokens[color] ?? colorTokens.sage;

const hasImage = computed(() => !!props.img);
const iconLookup = computed(() => [props.iconStyle ?? 'far', props.icon ?? 'user'] as [IconPrefix, IconName]);

const altText = computed(() => {
  if (props.alt) return props.alt;
  if (props.label) return `Avatar de ${props.label}`;
  return 'Avatar';
});

const displayLabel = computed(() => {
  const raw = props.label?.trim();
  if (!raw) return '';
  const words = raw.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.slice(0, 2).map((w) => w[0]).join('').toUpperCase();
});

const variantColors = computed(() => {
  const palette = getPalette(props.color);
  if (props.variant === 'secondary') return palette.secondary;
  return palette.primary;
});

const avatarStyle = computed(() => {
  const size = sizeMap[props.size];
  const baseStyle: Record<string, string> = {
    width: size.dimension,
    height: size.dimension,
    background: variantColors.value.background,
    color: variantColors.value.color
  };

  if (props.variant === 'picture' && !hasImage.value) {
    baseStyle.background = 'var(--color-background-alt)';
    baseStyle.color = 'var(--color-font-primary-base)';
  }
  if (props.variant === 'icon') {
    baseStyle.border = `1px solid var(--color-border-base)`;
  }

  return baseStyle;
});
</script>

<style scoped>
.gal-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-rounded);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  overflow: hidden;
  border: 1px solid transparent;
}

.gal-avatar__clip {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-rounded);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gal-avatar__clip img {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-rounded);
  object-fit: cover;
  display: block;
}

.gal-avatar__initials {
  display: inline-block;
  text-align: center;
}

.gal-avatar--lg {
  width: var(--row-h-lg);
  height: var(--row-h-lg);
}

.gal-avatar--md {
  width: var(--row-h-md);
  height: var(--row-h-md);
}

.gal-avatar--sm {
  width: var(--row-h-sm);
  height: var(--row-h-sm);
}

.gal-avatar--xs {
  width: var(--row-h-xs);
  height: var(--row-h-xs);
}

.gal-avatar--picture {
  border: 1px solid var(--color-border-base);
  background: var(--color-background-alt);
}

.gal-avatar__fa {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  width: 100%;
  height: 100%;
}
</style>
