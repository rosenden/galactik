import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '@galactik/react-ui/Tag';

/**
 * Tag component extracted from Figma "one chaps ui kit"
 * 
 * ## Design Specifications
 * - **Primary**: Uses sage color palette (sage-200 background)
 * - **Secondary**: Uses almond color palette (almond-200 background)
 * - **Border Radius**: 9999px (fully rounded pills)
 * - **Heights**: 24px (small), 36px (medium)
 * - **Padding**: 2px/8px (small), 4px/12px (medium)
 * 
 * ## Figma Components
 * - `oc-tag-primary`: Main variant with sage colors
 * - `oc-tag-secondary`: Alternative variant with almond colors
 * 
 * ## States
 * - Default, Hover, Focus, Disabled
 * - Closable with × button
 * - Clickable with onClick handler
 * - Icon support (prefix)
 */
const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tag component for labeling and categorization, extracted from Figma with exact design tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Tag color variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Tag size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
    onClose: {
      action: 'closed',
      description: 'Close handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

// Primary Variants (oc-tag-primary from Figma)

export const PrimaryMedium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Primary Tag',
  },
};

export const PrimarySmall: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'Small Tag',
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'With Icon',
    icon: '🏷️',
  },
};

export const PrimaryClosable: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Closable',
    closable: true,
    onClose: () => console.log('Tag closed'),
  },
};

export const PrimaryClickable: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Clickable',
    onClick: () => console.log('Tag clicked'),
  },
};

export const PrimaryDisabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Disabled',
    disabled: true,
  },
};

// Secondary Variants (oc-tag-secondary from Figma)

export const SecondaryMedium: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Secondary Tag',
  },
};

export const SecondarySmall: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    children: 'Small Tag',
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'With Icon',
    icon: '⭐',
  },
};

export const SecondaryClosable: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Closable',
    closable: true,
    onClose: () => console.log('Tag closed'),
  },
};

export const SecondaryDisabled: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Disabled',
    disabled: true,
  },
};

// Combinations & Examples

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Tag variant="primary" size="medium">
          Primary Medium
        </Tag>
        <Tag variant="primary" size="small">
          Primary Small
        </Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Tag variant="secondary" size="medium">
          Secondary Medium
        </Tag>
        <Tag variant="secondary" size="small">
          Secondary Small
        </Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Tag variant="primary" size="medium" icon="📌">
          With Icon
        </Tag>
        <Tag variant="primary" size="medium" closable>
          Closable
        </Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Tag variant="primary" size="medium" disabled>
          Disabled
        </Tag>
        <Tag variant="primary" size="medium" onClick={() => alert('Clicked!')}>
          Clickable
        </Tag>
      </div>
    </div>
  ),
};

export const TagList: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', maxWidth: '600px' }}>
      <Tag variant="primary">Design</Tag>
      <Tag variant="primary">Development</Tag>
      <Tag variant="secondary">Frontend</Tag>
      <Tag variant="secondary">Backend</Tag>
      <Tag variant="primary">React</Tag>
      <Tag variant="primary">TypeScript</Tag>
      <Tag variant="secondary">Figma</Tag>
      <Tag variant="secondary">Storybook</Tag>
      <Tag variant="primary">Component</Tag>
      <Tag variant="primary">Design System</Tag>
    </div>
  ),
};

export const ClosableTags: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Tag variant="primary" closable onClose={() => console.log('React removed')}>
        React
      </Tag>
      <Tag variant="primary" closable onClose={() => console.log('Vue removed')}>
        Vue
      </Tag>
      <Tag variant="primary" closable onClose={() => console.log('Angular removed')}>
        Angular
      </Tag>
      <Tag variant="secondary" closable onClose={() => console.log('Svelte removed')}>
        Svelte
      </Tag>
      <Tag variant="secondary" closable onClose={() => console.log('Solid removed')}>
        Solid
      </Tag>
    </div>
  ),
};

export const TagsWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Tag variant="primary" icon="🚀">
          Launch
        </Tag>
        <Tag variant="primary" icon="✅">
          Complete
        </Tag>
        <Tag variant="primary" icon="⏳">
          In Progress
        </Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Tag variant="secondary" icon="⭐">
          Featured
        </Tag>
        <Tag variant="secondary" icon="🔥">
          Trending
        </Tag>
        <Tag variant="secondary" icon="🆕">
          New
        </Tag>
      </div>
    </div>
  ),
};
