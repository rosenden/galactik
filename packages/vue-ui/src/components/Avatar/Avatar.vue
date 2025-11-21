<template>
  <span
    class="qa-avatar"
    :class="avatarClasses"
    :style="avatarStyle"
    role="img"
    :aria-label="altText"
  >
    <img
      v-if="src"
      :src="src"
      :alt="altText"
      :style="imgStyle"
    />
    <i
      v-else-if="icon"
      :class="icon"
      :style="iconStyle"
      aria-hidden="true"
    />
    <span v-else aria-hidden="true">{{ initials }}</span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import avatarSpecs from '../../../../../scripts/figma/specs/avatar-specs.json';

/**
 * Avatar Component - Synchronized with Figma Design System via MCP
 * ISO with React implementation
 */

type AvatarSize = 'small' | 'medium' | 'large';
type AvatarVariant = 'primary' | 'secondary';
type AvatarColor =
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

interface Props {
  name?: string;
  src?: string;
  icon?: string;
  alt?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  avatarColor?: AvatarColor;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: 'medium',
  variant: 'primary',
  avatarColor: 'sage'
});

// Color tokens - ISO with React
const colorTokens: Record<string, { primary: Record<'background' | 'color', string>; secondary: Record<'background' | 'color', string> }> = {
  sage: {
    primary: { background: 'var(--color-bg-primary-base)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-primary-lightest)', color: 'var(--color-font-primary-base)' }
  },
  almond: {
    primary: { background: 'var(--color-bg-secondary-base)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-secondary-lightest)', color: 'var(--color-font-secondary-base)' }
  },
  pink: {
    primary: { background: 'var(--color-bg-accent-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-accent-hover)', color: 'var(--color-font-accent-base)' }
  },
  grey: {
    primary: { background: 'var(--color-bg-neutral-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-neutral-disabled)', color: 'var(--color-font-neutral-muted)' }
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
    primary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-indigo-base-alt)', color: 'var(--color-font-indigo-base)' }
  },
  yellow: {
    primary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-yellow-base-alt)', color: 'var(--color-font-yellow-base)' }
  },
  cherry: {
    primary: { background: 'var(--color-bg-cherry-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-cherry-base)', color: 'var(--color-font-cherry-base)' }
  },
  cyan: {
    primary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-neutral-white)' },
    secondary: { background: 'var(--color-bg-cyan-base-alt)', color: 'var(--color-font-cyan-base)' }
  }
};

const colorAliases: Partial<Record<AvatarColor, keyof typeof colorTokens>> = {
  orange: 'warning',
  green: 'success',
  blue: 'info',
  red: 'error'
};

// Calculate initials from name
const getInitials = (name?: string) => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map(p => p.charAt(0).toUpperCase()).join('') || '?';
};

const initials = computed(() => getInitials(props.name));
const sizing = computed(() => {
  const spec = (avatarSpecs.sizes as Record<AvatarSize, any>)[props.size];
  if (!spec) return null;
  return {
    width: `${spec.width}px`,
    height: `${spec.height}px`,
    borderRadius: spec.borderRadius,
    fontSize: `${spec.fontSize}px`,
    fontWeight: spec.fontWeight,
    lineHeight: spec.lineHeight
  };
});
const avatarType = computed(() => props.src ? 'image' : props.icon ? 'icon' : 'initials');

const altText = computed(() => {
  if (props.alt) return props.alt;
  if (props.name) return `Avatar for ${props.name}`;
  if (props.icon) return 'Avatar with icon';
  return 'Avatar';
});

const paletteKey = computed(() => colorAliases[props.avatarColor] ?? props.avatarColor);
const palette = computed(() => colorTokens[paletteKey.value as keyof typeof colorTokens] ?? colorTokens.sage);
const variantTokens = computed(() => props.variant === 'secondary' ? palette.value.secondary : palette.value.primary);

const avatarClasses = computed(() => [
  'qa-avatar',
  `qa-avatar--${props.size}`,
  `qa-avatar--${avatarType.value}`
]);

const avatarStyle = computed(() => {
  if (!sizing.value) return {};
  
  const style: Record<string, string> = {
    display: 'inline-flex',
    'align-items': 'center',
    'justify-content': 'center',
    width: sizing.value.width,
    height: sizing.value.height,
    'min-width': sizing.value.width,
    'min-height': sizing.value.height,
    'font-size': sizing.value.fontSize,
    'font-weight': String(sizing.value.fontWeight),
    'line-height': String(sizing.value.lineHeight),
    'border-radius': sizing.value.borderRadius,
    overflow: 'hidden',
    'user-select': 'none',
    'flex-shrink': '0'
  };

  if (avatarType.value === 'initials') {
    style['font-family'] = 'Hanken Grotesk, sans-serif';
  }

  if (avatarType.value !== 'image') {
    style.background = variantTokens.value.background;
    style.color = variantTokens.value.color;
  } else {
    style.background = 'transparent';
  }

  return style;
});

const imgStyle = computed(() => ({
  width: '100%',
  height: '100%',
  'object-fit': 'cover'
}));

const iconStyle = computed(() => ({
  'font-size': 'inherit',
  'line-height': 'inherit'
}));
</script>

<style scoped>
.qa-avatar {
  /* All styles are inline for ISO consistency with React */
}
</style>
