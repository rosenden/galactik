import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Electrons/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
      description: 'The style variant of the button'
    },
    colorVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'light-accent', 'accent'],
      description: 'The color variant of the button'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

type ButtonArgs = {
  variant?: 'filled' | 'outlined' | 'text';
  colorVariant?: 'primary' | 'secondary' | 'light-accent' | 'accent';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  iconLeft?: string;
  iconRight?: string;
};

/**
 * @example
 * ```vue
 * <script setup>
 * import { Button } from '@/components/Button';
 * 
 * const handleClick = () => {
 *   console.log('Button clicked!');
 * };
 * </script>
 * 
 * <template>
 *   <!-- Button simple -->
 *   <Button 
 *     variant="filled" 
 *     color-variant="primary"
 *     @click="handleClick"
 *   >
 *     Click me
 *   </Button>
 * 
 *   <!-- Button with left icon -->
 *   <Button 
 *     variant="filled" 
 *     color-variant="primary"
 *     icon-left="fa-solid fa-plus"
 *   >
 *     Ajouter
 *   </Button>
 * 
 *   <!-- Button with right icon -->
 *   <Button 
 *     variant="outlined" 
 *     color-variant="secondary"
 *     icon-right="fa-solid fa-arrow-right"
 *   >
 *     Suivant
 *   </Button>
 * 
 *   <!-- Button icon-only -->
 *   <Button 
 *     variant="filled" 
 *     color-variant="accent"
 *     icon-only
 *     aria-label="Like"
 *   >
 *     <i class="fa-solid fa-heart"></i>
 *   </Button>
 * 
 *   <!-- Button with loading state -->
 *   <Button 
 *     variant="filled" 
 *     color-variant="primary"
 *     :loading="true"
 *   >
 *     Chargement...
 *   </Button>
 * 
 *   <!-- Disabled button -->
 *   <Button 
 *     variant="outlined" 
 *     color-variant="primary"
 *     :disabled="true"
 *   >
 *     Disabled
 *   </Button>
 * 
 *   <!-- Button pleine largeur -->
 *   <Button 
 *     variant="filled" 
 *     color-variant="accent"
 *     :full-width="true"
 *   >
 *     Pleine largeur
 *   </Button>
 * </template>
 * ```
 */

// ============================================
// PRIMARY COLOR VARIANT
// ============================================

export const PrimaryFilled: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Primary Button</Button>'
  })
};

export const PrimaryOutlined: Story = {
  args: {
    variant: 'outlined',
    colorVariant: 'primary',
    size: 'medium'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Primary Outlined</Button>'
  })
};

export const PrimaryText: Story = {
  args: {
    variant: 'text',
    colorVariant: 'primary',
    size: 'medium'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Primary Text</Button>'
  })
};

// ============================================
// SECONDARY COLOR VARIANT
// ============================================

export const SecondaryFilled: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'secondary',
    size: 'medium'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Secondary Button</Button>'
  })
};

export const SecondaryOutlined: Story = {
  args: {
    variant: 'outlined',
    colorVariant: 'secondary',
    size: 'medium'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Secondary Outlined</Button>'
  })
};

export const SecondaryText: Story = {
  args: {
    variant: 'text',
    colorVariant: 'secondary',
    size: 'medium'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Secondary Text</Button>'
  })
};

// ============================================
// LIGHT ACCENT COLOR VARIANT
// ============================================

export const LightAccentFilled: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'light-accent',
    size: 'medium'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Light Accent Button</Button>'
  })
};

export const LightAccentOutlined: Story = {
  args: {
    variant: 'outlined',
    colorVariant: 'light-accent',
    size: 'medium'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Light Accent Outlined</Button>'
  })
};

export const LightAccentText: Story = {
  args: {
    variant: 'text',
    colorVariant: 'light-accent',
    size: 'medium'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Light Accent Text</Button>'
  })
};

// ============================================
// ACCENT COLOR VARIANT
// ============================================

export const AccentFilled: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'accent',
    size: 'medium'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Accent Button</Button>'
  })
};

export const AccentOutlined: Story = {
  args: {
    variant: 'outlined',
    colorVariant: 'accent',
    size: 'medium'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Accent Outlined</Button>'
  })
};

export const AccentText: Story = {
  args: {
    variant: 'text',
    colorVariant: 'accent',
    size: 'medium'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Accent Text</Button>'
  })
};

// ============================================
// SIZES
// ============================================

export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: var(--space-lg); align-items: center;">
        <Button variant="filled" color-variant="primary" size="small">Small</Button>
        <Button variant="filled" color-variant="primary" size="medium">Medium</Button>
        <Button variant="filled" color-variant="primary" size="large">Large</Button>
      </div>
    `
  })
};

// ============================================
// WITH ICONS
// ============================================

export const WithLeftIcon: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
    iconLeft: 'fa-solid fa-play'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">With Icon</Button>'
  })
};

export const WithRightIcon: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
    iconRight: 'fa-solid fa-arrow-right'
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">With Icon</Button>'
  })
};

export const IconOnly: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: var(--space-lg); align-items: center;">
        <Button variant="filled" color-variant="primary" size="small" icon-only aria-label="Small icon button">
          <i class="fa-solid fa-heart"></i>
        </Button>
        <Button variant="filled" color-variant="primary" size="medium" icon-only aria-label="Medium icon button">
          <i class="fa-solid fa-plus"></i>
        </Button>
        <Button variant="filled" color-variant="primary" size="large" icon-only aria-label="Large icon button">
          <i class="fa-solid fa-check"></i>
        </Button>
      </div>
    `
  })
};

// ============================================
// STATES
// ============================================

export const DisabledState: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: var(--space-lg); align-items: center;">
        <Button variant="filled" color-variant="primary" size="medium" disabled>Filled Disabled</Button>
        <Button variant="outlined" color-variant="primary" size="medium" disabled>Outlined Disabled</Button>
        <Button variant="text" color-variant="primary" size="medium" disabled>Text Disabled</Button>
      </div>
    `
  })
};

export const LoadingState: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: var(--space-lg); align-items: center;">
        <Button variant="filled" color-variant="primary" size="medium" loading>Loading</Button>
        <Button variant="outlined" color-variant="primary" size="medium" loading>Loading</Button>
        <Button variant="text" color-variant="primary" size="medium" loading>Loading</Button>
      </div>
    `
  })
};

// ============================================
// FULL WIDTH
// ============================================

export const FullWidth: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
    fullWidth: true
  },
  render: (args: ButtonArgs) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Full Width Button</Button>'
  }),
  parameters: {
    layout: 'padded'
  }
};

// ============================================
// ALL VARIANTS SHOWCASE
// ============================================

export const RealWorldExamples: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--space-2xl);">
        <div>
          <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">
            Actions communes
          </h3>
          <div style="display: flex; gap: var(--space-lg); flex-wrap: wrap;">
            <Button variant="filled" color-variant="primary" size="medium" icon-left="fa-solid fa-plus">
              Ajouter
            </Button>
            <Button variant="filled" color-variant="primary" size="medium" icon-right="fa-solid fa-download">
              Download
            </Button>
            <Button variant="filled" color-variant="accent" size="medium" icon-right="fa-solid fa-paper-plane">
              Envoyer
            </Button>
            <Button variant="outlined" color-variant="secondary" size="medium" icon-left="fa-solid fa-user">
              Profil
            </Button>
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">
            Icon-only actions
          </h3>
          <div style="display: flex; gap: var(--space-lg);">
            <Button variant="filled" color-variant="primary" size="medium" icon-only aria-label="Like">
              <i class="fa-solid fa-heart"></i>
            </Button>
            <Button variant="outlined" color-variant="secondary" size="medium" icon-only aria-label="Add">
              <i class="fa-solid fa-plus"></i>
            </Button>
            <Button variant="text" color-variant="light-accent" size="medium" icon-only aria-label="Play">
              <i class="fa-solid fa-play"></i>
            </Button>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    layout: 'padded'
  }
};

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--space-2xl);">
        <!-- Primary -->
        <div>
          <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">
            Primary
          </h3>
          <div style="display: flex; gap: var(--space-lg);">
            <Button variant="filled" color-variant="primary" size="medium">Filled</Button>
            <Button variant="outlined" color-variant="primary" size="medium">Outlined</Button>
            <Button variant="text" color-variant="primary" size="medium">Text</Button>
          </div>
        </div>

        <!-- Secondary -->
        <div>
          <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">
            Secondary
          </h3>
          <div style="display: flex; gap: var(--space-lg);">
            <Button variant="filled" color-variant="secondary" size="medium">Filled</Button>
            <Button variant="outlined" color-variant="secondary" size="medium">Outlined</Button>
            <Button variant="text" color-variant="secondary" size="medium">Text</Button>
          </div>
        </div>

        <!-- Light Accent -->
        <div>
          <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">
            Light Accent
          </h3>
          <div style="display: flex; gap: var(--space-lg);">
            <Button variant="filled" color-variant="light-accent" size="medium">Filled</Button>
            <Button variant="outlined" color-variant="light-accent" size="medium">Outlined</Button>
            <Button variant="text" color-variant="light-accent" size="medium">Text</Button>
          </div>
        </div>

        <!-- Accent -->
        <div>
          <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">
            Accent
          </h3>
          <div style="display: flex; gap: var(--space-lg);">
            <Button variant="filled" color-variant="accent" size="medium">Filled</Button>
            <Button variant="outlined" color-variant="accent" size="medium">Outlined</Button>
            <Button variant="text" color-variant="accent" size="medium">Text</Button>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    layout: 'padded'
  }
};
