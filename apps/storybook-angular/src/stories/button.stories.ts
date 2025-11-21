import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from 'angular-ui/components/button/button.component';

type Story = StoryObj<ButtonComponent>;

const meta: Meta<ButtonComponent> = {
  title: 'Electrons/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent]
    })
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `@example
\`\`\`html
<!-- Basic button -->
<oc-button 
  variant="filled" 
  colorVariant="primary" 
  size="medium">
  Click me
</oc-button>

<!-- Button with left icon (Font Awesome) -->
<oc-button 
  variant="filled" 
  colorVariant="primary" 
  size="medium">
  <i class="fa-solid fa-play"></i> Play
</oc-button>

<!-- Button with right icon -->
<oc-button 
  variant="outlined" 
  colorVariant="secondary" 
  size="medium">
  Next <i class="fa-solid fa-arrow-right"></i>
</oc-button>

<!-- Icon only button -->
<oc-button 
  variant="filled" 
  colorVariant="primary" 
  size="small"
  aria-label="Like">
  <i class="fa-solid fa-heart"></i>
</oc-button>

<!-- Different variants -->
<oc-button variant="filled" colorVariant="primary">Filled</oc-button>
<oc-button variant="outlined" colorVariant="primary">Outlined</oc-button>
<oc-button variant="text" colorVariant="primary">Text</oc-button>

<!-- Disabled state -->
<oc-button variant="filled" [disabled]="true">Disabled</oc-button>

<!-- Loading state -->
<oc-button variant="filled" [loading]="true">Loading</oc-button>
\`\`\`

Button component synchronized with Figma Design System.`
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
      description: 'The style variant of the button',
    },
    colorVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'light-accent', 'accent'],
      description: 'The color variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width',
    },
  },
};

export default meta;

// ============================================
// PRIMARY COLOR VARIANT
// ============================================

export const PrimaryFilled: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size">
      Primary Button
    </oc-button>`
  }),
  args: {
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
  },
};

export const PrimaryOutlined: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size">
      Primary Outlined
    </oc-button>`
  }),
  args: {
    variant: 'outlined',
    colorVariant: 'primary',
    size: 'medium',
  },
};

export const PrimaryText: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size">
      Primary Text
    </oc-button>`
  }),
  args: {
    variant: 'text',
    colorVariant: 'primary',
    size: 'medium',
  },
};

// ============================================
// SECONDARY COLOR VARIANT
// ============================================

export const SecondaryFilled: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size">
      Secondary Button
    </oc-button>`
  }),
  args: {
    variant: 'filled',
    colorVariant: 'secondary',
    size: 'medium',
  },
};

export const SecondaryOutlined: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size">
      Secondary Outlined
    </oc-button>`
  }),
  args: {
    variant: 'outlined',
    colorVariant: 'secondary',
    size: 'medium',
  },
};

export const SecondaryText: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size">
      Secondary Text
    </oc-button>`
  }),
  args: {
    variant: 'text',
    colorVariant: 'secondary',
    size: 'medium',
  },
};

// ============================================
// LIGHT ACCENT COLOR VARIANT
// ============================================

export const LightAccentFilled: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size">
      Light Accent Button
    </oc-button>`
  }),
  args: {
    variant: 'filled',
    colorVariant: 'light-accent',
    size: 'medium',
  },
};

export const LightAccentOutlined: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size">
      Light Accent Outlined
    </oc-button>`
  }),
  args: {
    variant: 'outlined',
    colorVariant: 'light-accent',
    size: 'medium',
  },
};

export const LightAccentText: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size">
      Light Accent Text
    </oc-button>`
  }),
  args: {
    variant: 'text',
    colorVariant: 'light-accent',
    size: 'medium',
  },
};

// ============================================
// ACCENT COLOR VARIANT
// ============================================

export const AccentFilled: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size">
      Accent Button
    </oc-button>`
  }),
  args: {
    variant: 'filled',
    colorVariant: 'accent',
    size: 'medium',
  },
};

export const AccentOutlined: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size">
      Accent Outlined
    </oc-button>`
  }),
  args: {
    variant: 'outlined',
    colorVariant: 'accent',
    size: 'medium',
  },
};

export const AccentText: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size">
      Accent Text
    </oc-button>`
  }),
  args: {
    variant: 'text',
    colorVariant: 'accent',
    size: 'medium',
  },
};

// ============================================
// SIZES
// ============================================

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--space-lg); align-items: center;">
        <oc-button variant="filled" colorVariant="primary" size="small">Small</oc-button>
        <oc-button variant="filled" colorVariant="primary" size="medium">Medium</oc-button>
        <oc-button variant="filled" colorVariant="primary" size="large">Large</oc-button>
      </div>
    `
  }),
};

// ============================================
// WITH ICONS
// ============================================

export const WithLeftIcon: Story = {
  args: {
    size: 'medium',
    variant: 'filled',
    colorVariant: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `
      <oc-button 
        [size]="size" 
        [variant]="variant" 
        [colorVariant]="colorVariant"
      >
        <i class="fa-solid fa-play"></i> With Icon
      </oc-button>
    `
  })
};

export const WithRightIcon: Story = {
  args: {
    size: 'medium',
    variant: 'filled',
    colorVariant: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `
      <oc-button 
        [size]="size" 
        [variant]="variant" 
        [colorVariant]="colorVariant"
      >
        With Icon <i class="fa-solid fa-arrow-right"></i>
      </oc-button>
    `
  })
};

export const IconOnly: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--space-lg); align-items: center;">
        <oc-button 
          size="small" 
          variant="filled" 
          colorVariant="primary"
          aria-label="Small icon button"
        >
          <i class="fa-solid fa-heart"></i>
        </oc-button>
        <oc-button 
          size="medium" 
          variant="filled" 
          colorVariant="primary"
          aria-label="Medium icon button"
        >
          <i class="fa-solid fa-plus"></i>
        </oc-button>
        <oc-button 
          size="large" 
          variant="filled" 
          colorVariant="primary"
          aria-label="Large icon button"
        >
          <i class="fa-solid fa-check"></i>
        </oc-button>
      </div>
    `
  })
};

// ============================================
// STATES
// ============================================

export const DisabledState: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--space-lg); align-items: center;">
        <oc-button variant="filled" colorVariant="primary" size="medium" [disabled]="true">Filled Disabled</oc-button>
        <oc-button variant="outlined" colorVariant="primary" size="medium" [disabled]="true">Outlined Disabled</oc-button>
        <oc-button variant="text" colorVariant="primary" size="medium" [disabled]="true">Text Disabled</oc-button>
      </div>
    `
  }),
};

export const LoadingState: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--space-lg); align-items: center;">
        <oc-button variant="filled" colorVariant="primary" size="medium" [loading]="true">Loading</oc-button>
        <oc-button variant="outlined" colorVariant="primary" size="medium" [loading]="true">Loading</oc-button>
        <oc-button variant="text" colorVariant="primary" size="medium" [loading]="true">Loading</oc-button>
      </div>
    `
  }),
};

// ============================================
// FULL WIDTH
// ============================================

export const FullWidth: Story = {
  render: (args) => ({
    props: args,
    template: `<oc-button 
      [variant]="variant" 
      [colorVariant]="colorVariant" 
      [size]="size"
      [fullWidth]="fullWidth">
      Full Width Button
    </oc-button>`
  }),
  args: {
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// ============================================
// ALL VARIANTS SHOWCASE
// ============================================

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--space-2xl);">
        <!-- Primary -->
        <div>
          <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">Primary</h3>
          <div style="display: flex; gap: var(--space-lg);">
            <oc-button variant="filled" colorVariant="primary" size="medium">Filled</oc-button>
            <oc-button variant="outlined" colorVariant="primary" size="medium">Outlined</oc-button>
            <oc-button variant="text" colorVariant="primary" size="medium">Text</oc-button>
          </div>
        </div>

        <!-- Secondary -->
        <div>
          <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">Secondary</h3>
          <div style="display: flex; gap: var(--space-lg);">
            <oc-button variant="filled" colorVariant="secondary" size="medium">Filled</oc-button>
            <oc-button variant="outlined" colorVariant="secondary" size="medium">Outlined</oc-button>
            <oc-button variant="text" colorVariant="secondary" size="medium">Text</oc-button>
          </div>
        </div>

        <!-- Light Accent -->
        <div>
          <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">Light Accent</h3>
          <div style="display: flex; gap: var(--space-lg);">
            <oc-button variant="filled" colorVariant="light-accent" size="medium">Filled</oc-button>
            <oc-button variant="outlined" colorVariant="light-accent" size="medium">Outlined</oc-button>
            <oc-button variant="text" colorVariant="light-accent" size="medium">Text</oc-button>
          </div>
        </div>

        <!-- Accent -->
        <div>
          <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">Accent</h3>
          <div style="display: flex; gap: var(--space-lg);">
            <oc-button variant="filled" colorVariant="accent" size="medium">Filled</oc-button>
            <oc-button variant="outlined" colorVariant="accent" size="medium">Outlined</oc-button>
            <oc-button variant="text" colorVariant="accent" size="medium">Text</oc-button>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    layout: 'padded',
  },
};
