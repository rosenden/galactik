import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Badge, { BadgeProps } from 'react-ui/components/Badge';

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
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xs', 'sm', 'lg'],
      control: { type: 'inline-radio' },
      description: 'Taille du badge (tokens xs/sm/lg)'
    },
    color: {
      options: colorOptions,
      control: { type: 'select' },
      description: 'Thème (tokens sémantiques Portal)'
    },
    style: {
      options: ['primary', 'secondary'],
      control: { type: 'inline-radio' },
      description: 'Style plein ou bordé'
    },
    label: {
      control: 'text',
      description: 'Texte affiché'
    },
    showIcon: {
      control: 'boolean',
      description: 'Affiche l’icône passée en prop icon'
    },
    showFlag: {
      control: 'boolean',
      description: 'Affiche une pastille/dot'
    }
  },
  args: {
    label: 'Badge',
    size: 'sm',
    color: 'sage',
    style: 'primary',
    showIcon: false,
    showFlag: false
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const PalettePrimary: Story = {
  name: 'Couleurs (primary)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
      {colorOptions.map((color) => (
        <Badge key={color} label="1" color={color} style="primary" size="sm" />
      ))}
    </div>
  )
};

export const PaletteSecondary: Story = {
  name: 'Couleurs (secondary)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
      {colorOptions.map((color) => (
        <Badge key={color} label="1" color={color} style="secondary" size="sm" />
      ))}
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>XS</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
          {colorOptions.map((color) => (
            <Badge key={`xs-${color}`} label="1" color={color} style="primary" size="xs" />
          ))}
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>SM</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
          {colorOptions.map((color) => (
            <Badge key={`sm-${color}`} label="1" color={color} style="primary" size="sm" />
          ))}
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>LG</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
          {colorOptions.map((color) => (
            <Badge key={`lg-${color}`} label="1" color={color} style="primary" size="lg" />
          ))}
        </div>
      </div>
    </div>
  )
};

export const WithFlag: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge label="Success" color="success" showFlag />
      <Badge label="Warning" color="warning" showFlag />
      <Badge label="Info" color="info" showFlag />
      <Badge label="Error" color="error" showFlag />
    </div>
  )
};

export const WithIcon: Story = {
  name: 'Avec icônes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>Sizes LG - Primary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
          {colorOptions.map((color) => (
            <Badge 
              key={`lg-icon-${color}`} 
              label="😊" 
              color={color} 
              style="primary" 
              size="lg"
              showIcon={true}
              icon="😊"
            />
          ))}
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>Sizes SM - Primary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
          {colorOptions.map((color) => (
            <Badge 
              key={`sm-icon-${color}`} 
              label="😊" 
              color={color} 
              style="primary" 
              size="sm"
              showIcon={true}
              icon="😊"
            />
          ))}
        </div>
      </div>
    </div>
  )
};

export const Playground: Story = {};
