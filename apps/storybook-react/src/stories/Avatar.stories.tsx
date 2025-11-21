import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarProps } from 'react-ui/components/Avatar/Avatar';
import avatarSpecs from '../../../../scripts/figma/specs/avatar-specs.json';

type AvatarColor = NonNullable<AvatarProps['avatarColor']>;

// Color options aligned with Badge
const colorOptions: AvatarColor[] = [
  'sage',
  'almond',
  'pink',
  'grey',
  'success',
  'cherry',
  'warning',
  'indigo',
  'info',
  'yellow',
  'error',
  'cyan'
];

const meta: Meta<typeof Avatar> = {
  title: 'Electrons/Avatar',
  component: Avatar,
  parameters: { 
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`tsx
// Avatar with initials (default Figma colors)
<Avatar name="Alice Smith" size="medium" />

// Avatar with custom colors
<Avatar 
  name="Bob Jones" 
  size="large"
  background="#445556"
  color="#ffffff"
/>

// Avatar with image
<Avatar 
  name="Clara White"
  src="https://example.com/photo.jpg"
  size="large"
/>

// Avatar with border (Figma Frame header style)
<Avatar 
  name="David Brown"
  size="medium"
  background="#e8f0ee"
  color="#445556"
  strokeWeight={1}
  strokeColor="#445556"
/>

// User profile with avatar
<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Avatar name="Emma Wilson" size="large" />
  <div>
    <div style={{ fontWeight: 600 }}>Emma Wilson</div>
    <div style={{ fontSize: 12, color: 'var(--color-font-neutral-muted)' }}>Designer</div>
  </div>
</div>
\`\`\`
`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['small', 'medium', 'large'],
      description: 'Avatar size (24px, 32px, 48px)'
    },
    name: { 
      control: 'text',
      description: 'Full name to generate initials'
    },
    src: { 
      control: 'text',
      description: 'Image URL (if empty, displays initials)'
    },
    avatarColor: {
      control: 'select',
      options: colorOptions,
      description: 'Badge color (synced MCP)'
    },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'Variant (primary/secondary)'
    },
    icon: {
      control: 'text',
      description: 'Font Awesome icon class (ex: "fas fa-user")'
    }
  },
  args: {
    name: 'Xavier Xu',
    size: 'medium',
    avatarColor: 'sage',
    variant: 'primary'
  }
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Playground (appears first with controls)
export const Playground: Story = {};

// Palette Primary Color
export const PalettePrimary: Story = {
  name: 'Primary Color',
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', 
      gap: 16 
    }}>
      {colorOptions.map((colorOption) => (
        <div key={colorOption} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar 
            name={`${colorOption[0].toUpperCase()}${colorOption.slice(1)} ${colorOption[0].toUpperCase()}`}
            size="large"
            avatarColor={colorOption}
            variant="primary"
          />
          <div style={{ fontSize: 11, textAlign: 'center', fontFamily: 'monospace' }}>
            <div style={{ fontWeight: 600 }}>{colorOption}</div>
          </div>
        </div>
      ))}
    </div>
  )
};

// Palette Secondary Color
export const PaletteSecondary: Story = {
  name: 'Secondary Color',
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', 
      gap: 16 
    }}>
      {colorOptions.map((colorOption) => (
        <div key={colorOption} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar 
            name={`${colorOption[0].toUpperCase()}${colorOption.slice(1)} ${colorOption[0].toUpperCase()}`}
            size="large"
            avatarColor={colorOption}
            variant="secondary"
          />
          <div style={{ fontSize: 11, textAlign: 'center', fontFamily: 'monospace' }}>
            <div style={{ fontWeight: 600 }}>{colorOption}</div>
          </div>
        </div>
      ))}
    </div>
  )
};

// Sizes - Organized like Badge
export const Sizes: Story = {
  render: () => {
    const sizes: AvatarProps['size'][] = ['small', 'medium', 'large'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {sizes.map((s) => (
          <div key={s}>
            <h3 style={{ marginBottom: 12, fontSize: 14, textTransform: 'uppercase', color: 'var(--color-font-neutral-base)' }}>{s}</h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {colorOptions.map((colorOption) => (
                <Avatar 
                  key={colorOption}
                  name={`${colorOption[0].toUpperCase()}${colorOption.slice(1)} ${colorOption[0].toUpperCase()}`}
                  size={s}
                  avatarColor={colorOption}
                  variant="primary"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

// With images
export const WithImage: Story = {
  name: 'With Images',
  render: () => {
    const sampleImages = [
      'https://i.pravatar.cc/300?img=1',
      'https://i.pravatar.cc/300?img=5',
      'https://i.pravatar.cc/300?img=12',
      'https://i.pravatar.cc/300?img=33'
    ];
    const sizes: AvatarProps['size'][] = ['large', 'medium', 'small'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {sizes.map((size) => (
          <div key={size}>
            <h3 style={{ marginBottom: 12, fontSize: 14, textTransform: 'uppercase', color: 'var(--color-font-neutral-base)' }}>{size}</h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {sampleImages.map((src, idx) => (
                <Avatar 
                  key={idx}
                  name={`Person ${idx + 1}`}
                  src={src}
                  size={size}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

// With Font Awesome icons
export const WithIcons: Story = {
  name: 'With Icons',
  render: () => {
    const iconExamples = [
      { icon: 'fas fa-user', label: 'User', color: 'sage' as AvatarColor },
      { icon: 'fas fa-building', label: 'Building', color: 'info' as AvatarColor },
      { icon: 'fas fa-cog', label: 'Settings', color: 'grey' as AvatarColor },
      { icon: 'fas fa-heart', label: 'Heart', color: 'error' as AvatarColor },
      { icon: 'fas fa-star', label: 'Star', color: 'warning' as AvatarColor },
      { icon: 'fas fa-bell', label: 'Bell', color: 'yellow' as AvatarColor }
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h3 style={{ marginBottom: 12, fontSize: 14, fontWeight: 600, color: 'var(--color-font-neutral-base)' }}>Primary Variant</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {iconExamples.map((example, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Avatar 
                  icon={example.icon}
                  size="medium"
                  avatarColor={example.color}
                  variant="primary"
                  alt={example.label}
                />
                <span style={{ fontSize: 10, color: 'var(--color-font-neutral-muted)' }}>{example.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: 12, fontSize: 14, fontWeight: 600, color: 'var(--color-font-neutral-base)' }}>Secondary Variant</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {iconExamples.map((example, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Avatar 
                  icon={example.icon}
                  size="medium"
                  avatarColor={example.color}
                  variant="secondary"
                  alt={example.label}
                />
                <span style={{ fontSize: 10, color: 'var(--color-font-neutral-muted)' }}>{example.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};
