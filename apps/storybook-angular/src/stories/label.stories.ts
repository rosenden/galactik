import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { LabelComponent } from 'angular-ui/components/label/label.component';

type Story = StoryObj<LabelComponent>;

const colorOptions = ['sage', 'black', 'success', 'error', 'warning', 'info'] as const;
const sizeOptions = ['small', 'medium'] as const;

const meta: Meta<LabelComponent> = {
  title: 'Electrons/Label',
  component: LabelComponent,
  decorators: [
    moduleMetadata({
      imports: [LabelComponent]
    })
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `@example
\`\`\`html
<oc-label text="New Feature" color="success" size="medium" icon="fa-regular fa-image"></oc-label>
<oc-label text="Warning" color="warning" size="small" icon="fa-regular fa-triangle-exclamation"></oc-label>
<oc-label text="Info" color="info" size="medium"></oc-label>
\`\`\`
`
      }
    }
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Text displayed inside the label'
    },
    size: {
      options: sizeOptions,
      control: { type: 'inline-radio' },
      description: 'Label size'
    },
    color: {
      options: colorOptions,
      control: { type: 'select' },
      description: 'Color synced with Figma tokens'
    },
    icon: {
      control: 'text',
      description: 'Optional icon class (e.g. Font Awesome)'
    }
  },
  args: {
    text: 'Label',
    size: 'medium',
    color: 'sage',
    icon: 'fa-regular fa-image'
  }
};

export default meta;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: center;">
        <oc-label text="Medium" size="medium" color="sage" icon="fa-regular fa-image"></oc-label>
        <oc-label text="Small" size="small" color="sage" icon="fa-regular fa-image"></oc-label>
      </div>
    `
  })
};

export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <oc-label text="Sage" color="sage" size="medium" icon="fa-regular fa-image"></oc-label>
        <oc-label text="Black" color="black" size="medium" icon="fa-regular fa-image"></oc-label>
        <oc-label text="Warning" color="warning" size="medium" icon="fa-regular fa-triangle-exclamation"></oc-label>
        <oc-label text="Error" color="error" size="medium" icon="fa-regular fa-circle-xmark"></oc-label>
        <oc-label text="Success" color="success" size="medium" icon="fa-regular fa-circle-check"></oc-label>
        <oc-label text="Info" color="info" size="medium" icon="fa-regular fa-circle-info"></oc-label>
      </div>
    `
  })
};
