import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Bullet, BulletProps } from 'react-ui/components/Bullet/Bullet';
import bulletSpecs from '../../../../scripts/figma/specs/bullet-specs.json';

/**
 * Bullet - Circular list point
 * 
 * Component synchronized with Figma Design System via REST API.
 * Source: ${bulletSpecs.source}
 * Extracted on: ${new Date(bulletSpecs.extractedAt).toLocaleDateString('en-US')}
 * 
 * Used to create custom bullet lists with different colors and sizes.
 */
const meta: Meta<typeof Bullet> = {
  title: 'Electrons/Bullet',
  component: Bullet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: false,
        iframeHeight: 200
      },
      description: {
        component: `@example
\`\`\`tsx
// Medium bullet (default)
<Bullet color="sage" size="medium" />

// Small bullet
<Bullet color="info" size="small" />

// Extra small bullet
<Bullet color="error" size="xsmall" />

// Different colors
<Bullet color="success" />
<Bullet color="warning" />
<Bullet color="pink" />

// In a list
<ul style={{ listStyle: 'none', padding: 0 }}>
  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Bullet color="success" size="small" />
    <span>List item 1</span>
  </li>
  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Bullet color="success" size="small" />
    <span>List item 2</span>
  </li>
</ul>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium'],
      description: 'Bullet size'
    },
    color: {
      control: 'select',
      options: ['sage', 'pink', 'almond', 'grey', 'success', 'warning', 'info', 'error'],
      description: 'Bullet color'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Bullet>;

/**
 * Interactive playground to test the component
 */
export const Playground: Story = {
  args: {
    size: 'small',
    color: 'sage'
  }
};

/**
 * Available color palette
 */
export const Colors: Story = {
  render: () => {
    const colors: BulletProps['color'][] = ['sage', 'pink', 'almond', 'grey', 'success', 'warning', 'info', 'error'];
    
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', width: '100%' }}>
        {colors.map((color) => (
          <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Bullet color={color} size="medium" />
            <span style={{ fontSize: '11px', color: 'var(--color-font-neutral-base)' }}>{color}</span>
          </div>
        ))}
      </div>
    );
  }
};

/**
 * Size comparison
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
      <div>
        <h3 style={{ 
          marginBottom: '16px', 
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-font-neutral-base)'
        }}>
          Size comparison
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Bullet size="medium" color="sage" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-font-neutral-base)' }}>medium</div>
              <div style={{ fontSize: '10px', color: 'var(--color-font-neutral-muted)' }}>18px (r=9px + r=5px)</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Bullet size="small" color="sage" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-font-neutral-base)' }}>small</div>
              <div style={{ fontSize: '10px', color: 'var(--color-font-neutral-muted)' }}>10px (r=5px + r=3px)</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Bullet size="xsmall" color="sage" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-font-neutral-base)' }}>xsmall</div>
              <div style={{ fontSize: '10px', color: 'var(--color-font-neutral-muted)' }}>6px (r=3px)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
