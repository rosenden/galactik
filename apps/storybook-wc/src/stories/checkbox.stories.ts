import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type Args = {
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  label: string;
};

const meta: Meta<Args> = {
  title: 'Electrons/Checkbox',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`html
<gal-checkbox label="I accept the terms"></gal-checkbox>
<gal-checkbox checked label="Selected option"></gal-checkbox>
<gal-checkbox indeterminate label="Partial selection"></gal-checkbox>
<gal-checkbox disabled label="Disabled state"></gal-checkbox>
\`\`\`
`
      }
    }
  },
  argTypes: {
    checked: { control: 'boolean', description: 'Whether the checkbox is selected' },
    indeterminate: { control: 'boolean', description: 'Displays the horizontal bar for partial selection' },
    disabled: { control: 'boolean', description: 'Disables the component' },
    label: { control: 'text', description: 'Text displayed to the right' }
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    label: 'Check me'
  }
};

export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {
  render: (args) => html`
    <gal-checkbox
      .checked=${args.checked}
      .indeterminate=${args.indeterminate}
      .disabled=${args.disabled}
      label="${args.label}"
    ></gal-checkbox>
  `
};

export const SelectionStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <gal-checkbox label="Unselected"></gal-checkbox>
      <gal-checkbox .checked=${true} label="Selected"></gal-checkbox>
      <gal-checkbox .indeterminate=${true} label="Indeterminate (minus)"></gal-checkbox>
    </div>
  `
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <gal-checkbox .disabled=${true} label="Disabled unchecked"></gal-checkbox>
      <gal-checkbox .checked=${true} .disabled=${true} label="Disabled checked"></gal-checkbox>
      <gal-checkbox .indeterminate=${true} .disabled=${true} label="Disabled indeterminate"></gal-checkbox>
    </div>
  `
};

export const CheckboxGroup: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <h4 style="margin: 0; font-size: 14px; font-weight: 600; color: var(--color-font-neutral-base);">
        Choose your preferences
      </h4>
      <gal-checkbox label="Notifications email" .checked=${true}></gal-checkbox>
      <gal-checkbox label="Mode sombre"></gal-checkbox>
      <gal-checkbox label="Partage anonyme"></gal-checkbox>
      <gal-checkbox label="Newsletter" .checked=${true}></gal-checkbox>
    </div>
  `
};

export const SelectAllPattern: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px; background-color: var(--color-background-alt); border-radius: var(--radius-md);">
      <gal-checkbox
        label="Select all"
        .checked=${false}
        .indeterminate=${true}
      ></gal-checkbox>
      <div style="height: 1px; background-color: var(--color-border-base); margin: 4px 0;"></div>
      <div style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px;">
        <gal-checkbox label="Item 1" .checked=${true}></gal-checkbox>
        <gal-checkbox label="Item 2"></gal-checkbox>
        <gal-checkbox label="Item 3"></gal-checkbox>
      </div>
    </div>
  `
};
