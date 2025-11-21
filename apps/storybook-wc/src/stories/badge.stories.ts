import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type Args = {
  number: number;
  size: 'xs' | 'sm' | 'lg';
  color: 'sage' | 'almond' | 'pink' | 'grey' | 'info' | 'error' | 'success' | 'warning' | 'indigo' | 'yellow' | 'cherry' | 'cyan';
  variant: 'primary' | 'secondary';
  mode: 'number' | 'icon';
  icon: string;
};

const colorOptions: Args['color'][] = [
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
];

const meta: Meta<Args> = {
  title: 'Electrons/Badge',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    number: { control: 'number', description: 'Displayed number' },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'lg'], description: 'Taille du badge' },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'Theme (Portal semantic tokens)'
    },
    variant: { control: 'inline-radio', options: ['primary', 'secondary'], description: 'Filled or outlined style' },
    mode: { control: 'inline-radio', options: ['number', 'icon'], description: 'Display mode (number or icon)' },
    icon: { control: 'text', description: 'Classe Font Awesome' }
  },
  args: {
    number: 1,
    size: 'sm',
    color: 'sage',
    variant: 'primary',
    mode: 'number'
  }
};

export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {
  render: (args) => html`
    <gal-badge
      number="${args.number}"
      size="${args.size}"
      color="${args.color}"
      variant="${args.variant}"
      mode="${args.mode}"
      icon="${args.icon || ''}"
    ></gal-badge>
  `
};

export const PalettePrimary: Story = {
  name: 'Primary Color',
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
      ${colorOptions.map((color) => html`
        <gal-badge number="1" size="sm" color="${color}" variant="primary"></gal-badge>
      `)}
    </div>
  `
};

export const PaletteSecondary: Story = {
  name: 'Secondary Color',
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
      ${colorOptions.map((color) => html`
        <gal-badge number="1" size="sm" color="${color}" variant="secondary"></gal-badge>
      `)}
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h3 style="margin-bottom: 12px; font-size: 14px; color: var(--color-font-primary-base);">XS - Numbers</h3>
        <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
          ${colorOptions.map((color, idx) => html`
            <gal-badge number="${idx + 1}" size="xs" color="${color}" variant="primary" mode="number"></gal-badge>
          `)}
        </div>
      </div>
      <div>
        <h3 style="margin-bottom: 12px; font-size: 14px; color: var(--color-font-primary-base);">SM - Numbers</h3>
        <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
          ${colorOptions.map((color, idx) => html`
            <gal-badge number="${idx + 1}" size="sm" color="${color}" variant="primary" mode="number"></gal-badge>
          `)}
        </div>
      </div>
      <div>
        <h3 style="margin-bottom: 12px; font-size: 14px; color: var(--color-font-primary-base);">LG - Numbers</h3>
        <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
          ${colorOptions.map((color, idx) => html`
            <gal-badge number="${idx + 1}" size="lg" color="${color}" variant="primary" mode="number"></gal-badge>
          `)}
        </div>
      </div>
    </div>
  `
};

export const WithIcon: Story = {
  name: 'With Icons',
  render: () => {
    const sampleIcons = [
      'fa-regular fa-user',
      'fa-regular fa-heart',
      'fa-regular fa-star',
      'fa-regular fa-bell',
      'fa-regular fa-gear',
      'fa-regular fa-check',
      'fa-regular fa-xmark',
      'fa-regular fa-plus',
      'fa-regular fa-minus',
      'fa-regular fa-magnifying-glass',
      'fa-regular fa-download',
      'fa-regular fa-upload'
    ];

    return html`
      <div style="display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px;">
        ${colorOptions.map((color, idx) => html`
          <gal-badge 
            color="${color}" 
            variant="primary" 
            size="lg"
            mode="icon"
            icon="${sampleIcons[idx % sampleIcons.length]}"
          ></gal-badge>
        `)}
      </div>
    `;
  }
};
