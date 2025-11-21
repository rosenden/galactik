import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type Args = {
  size: 'xsmall' | 'small' | 'medium';
  color: 'sage' | 'pink' | 'almond' | 'grey' | 'success' | 'warning' | 'info' | 'error';
  variant: 'primary' | 'secondary';
};

const colors: Args['color'][] = ['sage', 'pink', 'almond', 'grey', 'success', 'warning', 'info', 'error'];

const meta: Meta<Args> = {
  title: 'Electrons/Bullet',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: { 
      control: 'select', 
      options: ['xsmall', 'small', 'medium'],
      description: 'Taille du bullet'
    },
    color: {
      control: 'select',
      options: colors,
      description: 'Couleur du bullet'
    },
    variant: { 
      control: 'inline-radio', 
      options: ['primary', 'secondary'],
      description: 'Variant: filled (primary) or light (secondary)'
    }
  },
  args: {
    size: 'small',
    color: 'sage',
    variant: 'primary'
  }
};

export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {
  render: (args) => html`
    <gal-bullet
      size="${args.size}"
      color="${args.color}"
      variant="${args.variant}"
    ></gal-bullet>
  `
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center; width: 100%;">
      ${colors.map((color) => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <gal-bullet size="medium" color="${color}"></gal-bullet>
          <span style="font-size: 11px; color: var(--color-font-neutral-base);">${color}</span>
        </div>
      `)}
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px;">
      <div>
        <h3 style="margin-bottom: 16px; font-size: 14px; font-weight: 600; color: var(--color-font-primary-base);">
          Comparaison des tailles
        </h3>
        <div style="display: flex; align-items: center; gap: 32px;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <gal-bullet size="medium" color="sage"></gal-bullet>
            <div style="text-align: center;">
              <div style="font-size: 12px; font-weight: 600; color: var(--color-font-neutral-base);">medium</div>
              <div style="font-size: 10px; color: var(--color-font-neutral-muted);">18px (r=9px + r=5px)</div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <gal-bullet size="small" color="sage"></gal-bullet>
            <div style="text-align: center;">
              <div style="font-size: 12px; font-weight: 600; color: var(--color-font-neutral-base);">small</div>
              <div style="font-size: 10px; color: var(--color-font-neutral-muted);">10px (r=5px + r=3px)</div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
            <gal-bullet size="xsmall" color="sage"></gal-bullet>
            <div style="text-align: center;">
              <div style="font-size: 12px; font-weight: 600; color: var(--color-font-neutral-base);">xsmall</div>
              <div style="font-size: 10px; color: var(--color-font-neutral-muted);">6px (r=3px)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
