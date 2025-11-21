import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type Args = {
  variant: 'filled' | 'outlined' | 'text';
  colorVariant: 'primary' | 'secondary' | 'light-accent' | 'accent';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
  iconOnly: boolean;
};

const meta: Meta<Args> = {
  title: 'Electrons/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
  args: {
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false
  }
};

export default meta;
type Story = StoryObj<Args>;

// ============================================
// PRIMARY COLOR VARIANT
// ============================================

export const PrimaryFilled: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Primary Button
    </gal-button>
  `
};

export const PrimaryOutlined: Story = {
  args: {
    variant: 'outlined',
    colorVariant: 'primary',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Primary Outlined
    </gal-button>
  `
};

export const PrimaryText: Story = {
  args: {
    variant: 'text',
    colorVariant: 'primary',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Primary Text
    </gal-button>
  `
};

// ============================================
// SECONDARY COLOR VARIANT
// ============================================

export const SecondaryFilled: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'secondary',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Secondary Button
    </gal-button>
  `
};

export const SecondaryOutlined: Story = {
  args: {
    variant: 'outlined',
    colorVariant: 'secondary',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Secondary Outlined
    </gal-button>
  `
};

export const SecondaryText: Story = {
  args: {
    variant: 'text',
    colorVariant: 'secondary',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Secondary Text
    </gal-button>
  `
};

// ============================================
// LIGHT ACCENT COLOR VARIANT
// ============================================

export const LightAccentFilled: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'light-accent',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Light Accent Button
    </gal-button>
  `
};

export const LightAccentOutlined: Story = {
  args: {
    variant: 'outlined',
    colorVariant: 'light-accent',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Light Accent Outlined
    </gal-button>
  `
};

export const LightAccentText: Story = {
  args: {
    variant: 'text',
    colorVariant: 'light-accent',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Light Accent Text
    </gal-button>
  `
};

// ============================================
// ACCENT COLOR VARIANT
// ============================================

export const AccentFilled: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'accent',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Accent Button
    </gal-button>
  `
};

export const AccentOutlined: Story = {
  args: {
    variant: 'outlined',
    colorVariant: 'accent',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Accent Outlined
    </gal-button>
  `
};

export const AccentText: Story = {
  args: {
    variant: 'text',
    colorVariant: 'accent',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Accent Text
    </gal-button>
  `
};

// ============================================
// SIZES
// ============================================

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: var(--space-lg); align-items: center;">
      <gal-button variant="filled" color-variant="primary" size="small">
        Small
      </gal-button>
      <gal-button variant="filled" color-variant="primary" size="medium">
        Medium
      </gal-button>
      <gal-button variant="filled" color-variant="primary" size="large">
        Large
      </gal-button>
    </div>
  `
};

// ============================================
// WITH ICONS
// ============================================

export const WithLeftIcon: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      <i class="fa-regular fa-play" slot="icon-left"></i>
      With Icon
    </gal-button>
  `
};

export const WithRightIcon: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      With Icon
      <i class="fa-regular fa-arrow-right" slot="icon-right"></i>
    </gal-button>
  `
};

export const IconOnly: Story = {
  render: () => html`
    <div style="display: flex; gap: var(--space-lg); align-items: center;">
      <gal-button
        variant="filled"
        color-variant="primary"
        size="small"
        icon-only
        aria-label="Small icon button"
      >
        <i class="fa-regular fa-heart"></i>
      </gal-button>
      <gal-button
        variant="filled"
        color-variant="primary"
        size="medium"
        icon-only
        aria-label="Medium icon button"
      >
        <i class="fa-regular fa-plus"></i>
      </gal-button>
      <gal-button
        variant="filled"
        color-variant="primary"
        size="large"
        icon-only
        aria-label="Large icon button"
      >
        <i class="fa-regular fa-check"></i>
      </gal-button>
    </div>
  `
};

// ============================================
// STATES
// ============================================

export const DisabledState: Story = {
  render: () => html`
    <div style="display: flex; gap: var(--space-lg); align-items: center;">
      <gal-button variant="filled" color-variant="primary" size="medium" disabled>
        Filled Disabled
      </gal-button>
      <gal-button variant="outlined" color-variant="primary" size="medium" disabled>
        Outlined Disabled
      </gal-button>
      <gal-button variant="text" color-variant="primary" size="medium" disabled>
        Text Disabled
      </gal-button>
    </div>
  `
};

export const LoadingState: Story = {
  render: () => html`
    <div style="display: flex; gap: var(--space-lg); align-items: center;">
      <gal-button variant="filled" color-variant="primary" size="medium" loading>
        Loading
      </gal-button>
      <gal-button variant="outlined" color-variant="primary" size="medium" loading>
        Loading
      </gal-button>
      <gal-button variant="text" color-variant="primary" size="medium" loading>
        Loading
      </gal-button>
    </div>
  `
};

// ============================================
// FULL WIDTH
// ============================================

export const FullWidth: Story = {
  args: {
    variant: 'filled',
    colorVariant: 'primary',
    size: 'medium',
    fullWidth: true,
  },
  render: (args) => html`
    <gal-button
      variant="${args.variant}"
      color-variant="${args.colorVariant}"
      size="${args.size}"
      ?full-width="${args.fullWidth}"
    >
      Full Width Button
    </gal-button>
  `,
  parameters: {
    layout: 'padded',
  },
};

// ============================================
// ALL VARIANTS SHOWCASE
// ============================================

export const RealWorldExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--space-2xl);">
      <div>
        <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">
          Common actions
        </h3>
        <div style="display: flex; gap: var(--space-lg); flex-wrap: wrap;">
          <gal-button variant="filled" color-variant="primary" size="medium">
            <i class="fa-regular fa-plus" slot="icon-left"></i>
            Add
          </gal-button>
          <gal-button variant="filled" color-variant="primary" size="medium">
            Download
            <i class="fa-regular fa-download" slot="icon-right"></i>
          </gal-button>
          <gal-button variant="filled" color-variant="accent" size="medium">
            Send
            <i class="fa-regular fa-paper-plane" slot="icon-right"></i>
          </gal-button>
          <gal-button variant="outlined" color-variant="secondary" size="medium">
            <i class="fa-regular fa-user" slot="icon-left"></i>
            Profile
          </gal-button>
        </div>
      </div>

      <div>
        <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">
          Icon-only actions
        </h3>
        <div style="display: flex; gap: var(--space-lg);">
          <gal-button variant="filled" color-variant="primary" size="medium" icon-only aria-label="Like">
            <i class="fa-regular fa-heart"></i>
          </gal-button>
          <gal-button variant="outlined" color-variant="secondary" size="medium" icon-only aria-label="Add">
            <i class="fa-regular fa-plus"></i>
          </gal-button>
          <gal-button variant="text" color-variant="light-accent" size="medium" icon-only aria-label="Play">
            <i class="fa-regular fa-play"></i>
          </gal-button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--space-2xl);">
      <!-- Primary -->
      <div>
        <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">
          Primary
        </h3>
        <div style="display: flex; gap: var(--space-lg);">
          <gal-button variant="filled" color-variant="primary" size="medium">
            Filled
          </gal-button>
          <gal-button variant="outlined" color-variant="primary" size="medium">
            Outlined
          </gal-button>
          <gal-button variant="text" color-variant="primary" size="medium">
            Text
          </gal-button>
        </div>
      </div>

      <!-- Secondary -->
      <div>
        <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">
          Secondary
        </h3>
        <div style="display: flex; gap: var(--space-lg);">
          <gal-button variant="filled" color-variant="secondary" size="medium">
            Filled
          </gal-button>
          <gal-button variant="outlined" color-variant="secondary" size="medium">
            Outlined
          </gal-button>
          <gal-button variant="text" color-variant="secondary" size="medium">
            Text
          </gal-button>
        </div>
      </div>

      <!-- Light Accent -->
      <div>
        <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">
          Light Accent
        </h3>
        <div style="display: flex; gap: var(--space-lg);">
          <gal-button variant="filled" color-variant="light-accent" size="medium">
            Filled
          </gal-button>
          <gal-button variant="outlined" color-variant="light-accent" size="medium">
            Outlined
          </gal-button>
          <gal-button variant="text" color-variant="light-accent" size="medium">
            Text
          </gal-button>
        </div>
      </div>

      <!-- Accent -->
      <div>
        <h3 style="margin-bottom: var(--space-lg); font-family: var(--font-family-base);">
          Accent
        </h3>
        <div style="display: flex; gap: var(--space-lg);">
          <gal-button variant="filled" color-variant="accent" size="medium">
            Filled
          </gal-button>
          <gal-button variant="outlined" color-variant="accent" size="medium">
            Outlined
          </gal-button>
          <gal-button variant="text" color-variant="accent" size="medium">
            Text
          </gal-button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    layout: 'padded',
  },
};
