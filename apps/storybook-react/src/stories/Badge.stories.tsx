import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { library, IconDefinition, IconLookup } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge, { BadgeProps } from 'react-ui/components/Badge/Badge';

// Register Font Awesome icons
const iconEntries = Object.values(far).reduce<IconDefinition[]>((acc, icon) => {
  if (typeof icon === 'object' && icon && 'iconName' in icon) {
    if (!acc.some((existing) => existing.iconName === icon.iconName)) {
      acc.push(icon as IconDefinition);
    }
  }
  return acc;
}, []);
library.add(...iconEntries);

const colorOptions: NonNullable<BadgeProps['color']>[] = [
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

const meta: Meta<typeof Badge> = {
  title: 'Electrons/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`tsx
// Badge with number (default)
<Badge label={5} color="sage" style="primary" size="sm" />

// Badge with custom colors
<Badge label={12} color="info" style="secondary" size="lg" />

// Badge with icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<Badge 
  color="error" 
  style="primary" 
  size="lg"
  mode="icon"
  icon={<FontAwesomeIcon icon={['far', 'bell']} />}
/>

// Badge dans une interface utilisateur
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <span>Notifications</span>
  <Badge label={3} color="cherry" style="primary" size="xs" />
</div>
\`\`\`
`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'lg'],
      control: { type: 'inline-radio' },
      description: 'Badge size (tokens xs/sm/lg)'
    },
    color: {
      options: colorOptions,
      control: { type: 'select' },
      description: 'Theme (Portal semantic tokens)'
    },
    style: {
      options: ['primary', 'secondary'],
      control: { type: 'inline-radio' },
      description: 'Filled or bordered style'
    },
    label: {
      control: { type: 'number' },
      description: 'Displayed number'
    },
    showIcon: {
      control: 'boolean',
      description: 'Display the icon passed as icon prop'
    }
  },
  args: {
    label: 1,
    size: 'sm',
    color: 'sage',
    style: 'primary',
    showIcon: false
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Playground (appears first with controls)
export const Playground: Story = {};

export const PalettePrimary: Story = {
  name: 'Primary Color',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
      {colorOptions.map((color) => (
        <Badge key={color} label={1} color={color} style="primary" size="sm" />
      ))}
    </div>
  )
};

export const PaletteSecondary: Story = {
  name: 'Secondary Color',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
      {colorOptions.map((color) => (
        <Badge key={color} label={1} color={color} style="secondary" size="sm" />
      ))}
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14, color: 'var(--color-font-neutral-base)' }}>XS - Numbers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
          {colorOptions.map((color, idx) => (
            <Badge key={`xs-${color}`} label={idx + 1} color={color} style="primary" size="xs" mode="number" />
          ))}
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14, color: 'var(--color-font-neutral-base)' }}>SM - Numbers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
          {colorOptions.map((color, idx) => (
            <Badge key={`sm-${color}`} label={idx + 1} color={color} style="primary" size="sm" mode="number" />
          ))}
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14, color: 'var(--color-font-neutral-base)' }}>LG - Numbers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
          {colorOptions.map((color, idx) => (
            <Badge key={`lg-${color}`} label={idx + 1} color={color} style="primary" size="lg" mode="number" />
          ))}
        </div>
      </div>
    </div>
  )
};

export const WithIcon: Story = {
  name: 'With Icons',
  render: () => {
    const sampleIcons = [
      'user',
      'heart',
      'star',
      'bell',
      'cog',
      'check',
      'times',
      'plus',
      'minus',
      'search',
      'download',
      'upload'
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 12 }}>
          {colorOptions.map((color, idx) => (
            <Badge 
              key={`lg-icon-${color}`} 
              color={color} 
              style="primary" 
              size="lg"
              mode="icon"
              icon={<FontAwesomeIcon icon={['far', sampleIcons[idx % sampleIcons.length]] as unknown as IconLookup} />}
            />
          ))}
        </div>
      </div>
    );
  }
};
