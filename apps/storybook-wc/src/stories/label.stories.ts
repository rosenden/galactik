import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

type Args = {
  text: string;
  size: 'small' | 'medium';
  color: 'sage' | 'black' | 'success' | 'error' | 'warning' | 'info';
  icon?: string;
};

const meta: Meta<Args> = {
  title: 'Electrons/Label',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `@example
\`\`\`html
<gal-label text="New Feature" color="success" size="medium" icon="fa-regular fa-circle-check"></gal-label>
<gal-label text="Beta" color="warning" size="small" icon="fa-regular fa-triangle-exclamation"></gal-label>
<gal-label color="sage"><span>Tag</span></gal-label>
\`\`\`
`
      }
    }
  },
  argTypes: {
    text: { control: 'text', description: 'Text displayed inside the label' },
    size: { control: 'inline-radio', options: ['small', 'medium'], description: 'Taille du label' },
    color: {
      control: 'select',
      options: ['sage', 'black', 'success', 'error', 'warning', 'info'],
      description: 'Couleur (tokens Figma)'
    },
    icon: { control: 'text', description: 'Classe Font Awesome optionnelle' }
  },
  args: {
    text: 'Label',
    size: 'medium',
    color: 'sage',
    icon: 'fa-regular fa-image'
  }
};

export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {
  render: (args) => html`
    <gal-label
      text="${args.text}"
      size="${args.size}"
      color="${args.color}"
      icon="${args.icon ?? ''}"
    ></gal-label>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <gal-label text="Medium" size="medium" color="sage" icon="fa-regular fa-image"></gal-label>
      <gal-label text="Small" size="small" color="sage" icon="fa-regular fa-image"></gal-label>
    </div>
  `
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <gal-label text="Sage" color="sage" size="medium" icon="fa-regular fa-image"></gal-label>
      <gal-label text="Black" color="black" size="medium" icon="fa-regular fa-image"></gal-label>
      <gal-label text="Warning" color="warning" size="medium" icon="fa-regular fa-triangle-exclamation"></gal-label>
      <gal-label text="Error" color="error" size="medium" icon="fa-regular fa-circle-xmark"></gal-label>
      <gal-label text="Success" color="success" size="medium" icon="fa-regular fa-circle-check"></gal-label>
      <gal-label text="Info" color="info" size="medium" icon="fa-regular fa-circle-info"></gal-label>
    </div>
  `
};
