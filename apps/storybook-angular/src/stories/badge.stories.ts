import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BadgeComponent } from 'angular-ui/components/badge/badge.component';

type Story = StoryObj<BadgeComponent>;

const colorOptions = [
  'sage',
  'almond',
  'pink',
  'grey',
  'info',
  'error',
  'success',
  'warning',
  'indigo',
  'yellow',
  'cherry',
  'cyan'
] as const;

const meta: Meta<BadgeComponent> = {
  title: 'Electrons/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BadgeComponent]
    })
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`html
<!-- Badge with number (default mode) -->
<oc-badge [label]="5" color="sage" style="primary" size="sm"></oc-badge>

<!-- Badge with custom colors -->
<oc-badge [label]="12" color="info" style="secondary" size="lg"></oc-badge>

<!-- Badge with icon (Font Awesome) -->
<oc-badge 
  color="error" 
  style="primary" 
  size="lg"
  mode="icon">
  <i class="fa-solid fa-bell"></i>
</oc-badge>

<!-- Badge in a notification -->
<div style="display: flex; align-items: center; gap: 8px">
  <span>Notifications</span>
  <oc-badge [label]="3" color="cherry" style="primary" size="xs"></oc-badge>
</div>
\`\`\`
`
      }
    }
  },
  argTypes: {
    size: {
      options: ['xs', 'sm', 'lg'],
      control: { type: 'inline-radio' },
      description: 'Badge size (xs/sm/lg tokens)'
    },
    color: {
      options: colorOptions,
      control: { type: 'select' },
      description: 'Theme (Portal semantic tokens)'
    },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'inline-radio' },
      description: 'Filled or outlined style'
    },
    label: {
      control: { type: 'text' },
      description: 'Displayed number'
    },
    mode: {
      options: ['number', 'icon'],
      control: { type: 'inline-radio' },
      description: 'Display mode'
    }
  },
  args: {
    label: '1',
    size: 'sm',
    color: 'sage',
    variant: 'primary',
    mode: 'number'
  }
};

export default meta;

// Playground (first story with controls)
export const Playground: Story = {};

export const PalettePrimary: Story = {
  name: 'Primary Color',
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
        <oc-badge [label]="1" color="sage" variant="primary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="almond" variant="primary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="pink" variant="primary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="grey" variant="primary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="info" variant="primary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="error" variant="primary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="success" variant="primary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="warning" variant="primary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="indigo" variant="primary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="yellow" variant="primary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="cherry" variant="primary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="cyan" variant="primary" size="sm"></oc-badge>
      </div>
    `
  })
};

export const PaletteSecondary: Story = {
  name: 'Secondary Color',
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
        <oc-badge [label]="1" color="sage" variant="secondary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="almond" variant="secondary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="pink" variant="secondary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="grey" variant="secondary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="info" variant="secondary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="error" variant="secondary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="success" variant="secondary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="warning" variant="secondary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="indigo" variant="secondary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="yellow" variant="secondary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="cherry" variant="secondary" size="sm"></oc-badge>
        <oc-badge [label]="1" color="cyan" variant="secondary" size="sm"></oc-badge>
      </div>
    `
  })
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; color: var(--color-font-primary-base);">XS - Numbers</h3>
          <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
            <oc-badge [label]="1" color="sage" variant="primary" size="xs" mode="number"></oc-badge>
            <oc-badge [label]="2" color="almond" variant="primary" size="xs" mode="number"></oc-badge>
            <oc-badge [label]="3" color="pink" variant="primary" size="xs" mode="number"></oc-badge>
            <oc-badge [label]="4" color="grey" variant="primary" size="xs" mode="number"></oc-badge>
            <oc-badge [label]="5" color="info" variant="primary" size="xs" mode="number"></oc-badge>
            <oc-badge [label]="6" color="error" variant="primary" size="xs" mode="number"></oc-badge>
            <oc-badge [label]="7" color="success" variant="primary" size="xs" mode="number"></oc-badge>
            <oc-badge [label]="8" color="warning" variant="primary" size="xs" mode="number"></oc-badge>
            <oc-badge [label]="9" color="indigo" variant="primary" size="xs" mode="number"></oc-badge>
            <oc-badge [label]="10" color="yellow" variant="primary" size="xs" mode="number"></oc-badge>
            <oc-badge [label]="11" color="cherry" variant="primary" size="xs" mode="number"></oc-badge>
            <oc-badge [label]="12" color="cyan" variant="primary" size="xs" mode="number"></oc-badge>
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; color: var(--color-font-primary-base);">SM - Numbers</h3>
          <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
            <oc-badge [label]="1" color="sage" variant="primary" size="sm" mode="number"></oc-badge>
            <oc-badge [label]="2" color="almond" variant="primary" size="sm" mode="number"></oc-badge>
            <oc-badge [label]="3" color="pink" variant="primary" size="sm" mode="number"></oc-badge>
            <oc-badge [label]="4" color="grey" variant="primary" size="sm" mode="number"></oc-badge>
            <oc-badge [label]="5" color="info" variant="primary" size="sm" mode="number"></oc-badge>
            <oc-badge [label]="6" color="error" variant="primary" size="sm" mode="number"></oc-badge>
            <oc-badge [label]="7" color="success" variant="primary" size="sm" mode="number"></oc-badge>
            <oc-badge [label]="8" color="warning" variant="primary" size="sm" mode="number"></oc-badge>
            <oc-badge [label]="9" color="indigo" variant="primary" size="sm" mode="number"></oc-badge>
            <oc-badge [label]="10" color="yellow" variant="primary" size="sm" mode="number"></oc-badge>
            <oc-badge [label]="11" color="cherry" variant="primary" size="sm" mode="number"></oc-badge>
            <oc-badge [label]="12" color="cyan" variant="primary" size="sm" mode="number"></oc-badge>
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; color: var(--color-font-primary-base);">LG - Numbers</h3>
          <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
            <oc-badge [label]="1" color="sage" variant="primary" size="lg" mode="number"></oc-badge>
            <oc-badge [label]="2" color="almond" variant="primary" size="lg" mode="number"></oc-badge>
            <oc-badge [label]="3" color="pink" variant="primary" size="lg" mode="number"></oc-badge>
            <oc-badge [label]="4" color="grey" variant="primary" size="lg" mode="number"></oc-badge>
            <oc-badge [label]="5" color="info" variant="primary" size="lg" mode="number"></oc-badge>
            <oc-badge [label]="6" color="error" variant="primary" size="lg" mode="number"></oc-badge>
            <oc-badge [label]="7" color="success" variant="primary" size="lg" mode="number"></oc-badge>
            <oc-badge [label]="8" color="warning" variant="primary" size="lg" mode="number"></oc-badge>
            <oc-badge [label]="9" color="indigo" variant="primary" size="lg" mode="number"></oc-badge>
            <oc-badge [label]="10" color="yellow" variant="primary" size="lg" mode="number"></oc-badge>
            <oc-badge [label]="11" color="cherry" variant="primary" size="lg" mode="number"></oc-badge>
            <oc-badge [label]="12" color="cyan" variant="primary" size="lg" mode="number"></oc-badge>
          </div>
        </div>
      </div>
    `
  })
};

export const WithIcon: Story = {
  name: 'With Icons',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px;">
          <oc-badge color="sage" style="primary" size="lg" mode="icon"><i class="fa-solid fa-user"></i></oc-badge>
          <oc-badge color="almond" style="primary" size="lg" mode="icon"><i class="fa-solid fa-heart"></i></oc-badge>
          <oc-badge color="pink" style="primary" size="lg" mode="icon"><i class="fa-solid fa-star"></i></oc-badge>
          <oc-badge color="grey" style="primary" size="lg" mode="icon"><i class="fa-solid fa-bell"></i></oc-badge>
          <oc-badge color="info" style="primary" size="lg" mode="icon"><i class="fa-solid fa-gear"></i></oc-badge>
          <oc-badge color="error" style="primary" size="lg" mode="icon"><i class="fa-solid fa-check"></i></oc-badge>
          <oc-badge color="success" style="primary" size="lg" mode="icon"><i class="fa-solid fa-xmark"></i></oc-badge>
          <oc-badge color="warning" style="primary" size="lg" mode="icon"><i class="fa-solid fa-plus"></i></oc-badge>
          <oc-badge color="indigo" style="primary" size="lg" mode="icon"><i class="fa-solid fa-minus"></i></oc-badge>
          <oc-badge color="yellow" style="primary" size="lg" mode="icon"><i class="fa-solid fa-magnifying-glass"></i></oc-badge>
          <oc-badge color="cherry" style="primary" size="lg" mode="icon"><i class="fa-solid fa-download"></i></oc-badge>
          <oc-badge color="cyan" style="primary" size="lg" mode="icon"><i class="fa-solid fa-upload"></i></oc-badge>
        </div>
      </div>
    `
  })
};
