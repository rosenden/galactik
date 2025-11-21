import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Label from 'react-ui/components/Label';
import { ImageIcon, WarningIcon, ErrorIcon, SuccessIcon, InfoIcon } from 'react-ui/components/Label/LabelIcons';

const meta = {
  title: 'Electrons/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `@example
\`\`\`tsx
// Medium label (default)
import { SuccessIcon } from '@galactik/react-ui/components/Label/LabelIcons';
<Label text="New Feature" color="success" size="medium" icon={<SuccessIcon />} />

// Small label
<Label text="Beta" size="small" color="warning" icon={<WarningIcon />} />

// Different colors
import { ImageIcon, WarningIcon, ErrorIcon, InfoIcon } from '@galactik/react-ui/components/Label/LabelIcons';
<Label text="Active" color="sage" icon={<ImageIcon />} />
<Label text="Draft" color="black" icon={<ImageIcon />} />
<Label text="Warning" color="warning" icon={<WarningIcon />} />
<Label text="Error" color="error" icon={<ErrorIcon />} />
<Label text="Success" color="success" icon={<SuccessIcon />} />
<Label text="Info" color="info" icon={<InfoIcon />} />

// Without icon (optional)
<Label text="Tag" color="sage" />
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content displayed in the label',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the label (small: 12px, medium: 14px)',
    },
    color: {
      control: 'select',
      options: ['sage', 'black', 'success', 'error', 'warning', 'info'],
      description: 'Color theme from Figma Design System',
    },
    icon: {
      control: false,
      description: 'Optional leading icon (React node)',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    text: 'Label',
    size: 'medium',
    color: 'sage',
    icon: <ImageIcon />,
  },
};

/**
 * Different sizes from Figma
 */
export const Sizes: Story = {
  args: {
    text: 'Label',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Label text="Label" size="medium" color="sage" icon={<ImageIcon />} />
      <Label text="Label" size="small" color="sage" icon={<ImageIcon />} />
    </div>
  ),
};

/**
 * All color variants from Figma
 */
export const Colors: Story = {
  args: {
    text: 'Label',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Label text="Label" color="sage" size="medium" icon={<ImageIcon />} />
      <Label text="Label" color="black" size="medium" icon={<ImageIcon />} />
      <Label text="Label" color="warning" size="medium" icon={<WarningIcon />} />
      <Label text="Label" color="error" size="medium" icon={<ErrorIcon />} />
      <Label text="Label" color="success" size="medium" icon={<SuccessIcon />} />
      <Label text="Label" color="info" size="medium" icon={<InfoIcon />} />
    </div>
  ),
};
