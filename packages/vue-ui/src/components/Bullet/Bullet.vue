<template>
  <span
    :class="bulletClasses"
    :style="outerStyle"
    role="presentation"
    aria-hidden="true"
    @click="handleClick"
  >
    <span v-if="size !== 'xsmall'" :style="innerStyle" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type BulletSize = 'xsmall' | 'small' | 'medium';
type BulletVariant = 'primary' | 'secondary';
type BulletColor =
  | 'sage'
  | 'pink'
  | 'almond'
  | 'grey'
  | 'success'
  | 'warning'
  | 'info'
  | 'error';

interface Props {
  /** Size of the bullet: xsmall (6px), small (10px), medium (18px) */
  size?: BulletSize;
  /** Color theme based on semantic tokens */
  color?: BulletColor;
  /** Variant: filled (primary) or light (secondary) */
  variant?: BulletVariant;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  color: 'sage',
  variant: 'primary'
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// Size tokens from Figma extraction (bullet-specs.json)
const sizeTokens: Record<BulletSize, { width: string; height: string }> = {
  xsmall: { width: '6px', height: '6px' },
  small: { width: '10px', height: '10px' },
  medium: { width: '18px', height: '18px' }
};

// Color tokens mapped to exact Figma palette tokens
const colorTokens: Record<
  BulletColor,
  { primary: Record<'background', string>; secondary: Record<'background', string> }
> = {
  sage: {
    primary: { background: 'var(--sage-800)' },
    secondary: { background: 'var(--sage-200)' }
  },
  pink: {
    primary: { background: 'var(--pink-950)' },
    secondary: { background: 'var(--pink-200)' }
  },
  almond: {
    primary: { background: 'var(--almond-800)' },
    secondary: { background: 'var(--almond-200)' }
  },
  grey: {
    primary: { background: 'var(--grey-800)' },
    secondary: { background: 'var(--grey-200)' }
  },
  success: {
    primary: { background: 'var(--green-800)' },
    secondary: { background: 'var(--green-200)' }
  },
  warning: {
    primary: { background: 'var(--orange-800)' },
    secondary: { background: 'var(--orange-200)' }
  },
  info: {
    primary: { background: 'var(--blue-800)' },
    secondary: { background: 'var(--blue-200)' }
  },
  error: {
    primary: { background: 'var(--red-800)' },
    secondary: { background: 'var(--red-200)' }
  }
};

const bulletClasses = computed(() => {
  return [
    'oc-bullet',
    `oc-bullet--${props.size}`,
    `oc-bullet--${props.variant}`,
    `oc-bullet--${props.color}`
  ].join(' ');
});

const colorStyles = computed(() => colorTokens[props.color]);
const sizeStyles = computed(() => sizeTokens[props.size]);

const outerStyle = computed(() => {
  if (props.size === 'xsmall') {
    // For xsmall, single circle only
    return {
      ...sizeStyles.value,
      background: props.variant === 'secondary' ? colorStyles.value.secondary.background : colorStyles.value.primary.background,
      'border-radius': '50%',
      display: 'inline-block',
      'flex-shrink': '0'
    };
  }

  // For small and medium: concentric circles (outer circle)
  return {
    ...sizeStyles.value,
    background: colorStyles.value.secondary.background,
    'border-radius': '50%',
    display: 'inline-flex',
    'align-items': 'center',
    'justify-content': 'center',
    'flex-shrink': '0',
    position: 'relative'
  };
});

const innerStyle = computed(() => {
  // Inner circle size based on Figma structure
  const innerSize = props.size === 'small' ? '6px' : '10px'; // small: 3px radius = 6px diameter, medium: 5px radius = 10px diameter
  
  return {
    width: innerSize,
    height: innerSize,
    background: colorStyles.value.primary.background,
    'border-radius': '50%'
  };
});

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<style scoped>
.oc-bullet {
  cursor: default;
}
</style>
