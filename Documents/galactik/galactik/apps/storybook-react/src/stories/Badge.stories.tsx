import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { library, IconDefinition, IconLookup } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge, { BadgeProps } from 'react-ui/components/Badge';

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
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>XS - Numbers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
          {colorOptions.map((color, idx) => (
            <Badge key={`xs-${color}`} label={String(idx + 1)} color={color} style="primary" size="xs" mode="number" />
          ))}
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>SM - Numbers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
          {colorOptions.map((color, idx) => (
            <Badge key={`sm-${color}`} label={String(idx + 1)} color={color} style="primary" size="sm" mode="number" />
          ))}
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>LG - Numbers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12 }}>
          {colorOptions.map((color, idx) => (
            <Badge key={`lg-${color}`} label={String(idx + 1)} color={color} style="primary" size="lg" mode="number" />
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
  name: 'Avec icônes Font Awesome',
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
        <div>
          <h3 style={{ marginBottom: 12, fontSize: 14 }}>Icon/Avatar Mode - LG</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 12 }}>
            {colorOptions.slice(0, 6).map((color, idx) => (
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
        <div>
          <h3 style={{ marginBottom: 12, fontSize: 14 }}>Icon/Avatar Mode - SM</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 12 }}>
            {colorOptions.slice(6, 12).map((color, idx) => (
              <Badge 
                key={`sm-icon-${color}`} 
                color={color} 
                style="primary" 
                size="sm"
                mode="icon"
                icon={<FontAwesomeIcon icon={['far', sampleIcons[(idx + 6) % sampleIcons.length]] as unknown as IconLookup} />}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 12, fontSize: 14 }}>All Icon Variations (LG)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: 12 }}>
            {sampleIcons.map((iconName, idx) => (
              <Badge 
                key={`preview-${iconName}`} 
                color={colorOptions[idx % colorOptions.length]} 
                style="primary" 
                size="lg"
                mode="icon"
                icon={<FontAwesomeIcon icon={['far', iconName] as unknown as IconLookup} />}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export const Playground: Story = {};

export const Modes: Story = {
  name: 'Modes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>Mode: number (default)</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Badge label="1" color="sage" style="primary" size="lg" mode="number" />
          <Badge label="5" color="info" style="primary" size="lg" mode="number" />
          <Badge label="99" color="error" style="primary" size="lg" mode="number" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>Mode: icon (avatar/icon only)</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Badge color="sage" style="primary" size="lg" mode="icon" icon={<FontAwesomeIcon icon={['far', 'user'] as unknown as IconLookup} />} />
          <Badge color="info" style="primary" size="lg" mode="icon" icon={<FontAwesomeIcon icon={['far', 'heart'] as unknown as IconLookup} />} />
          <Badge color="success" style="primary" size="lg" mode="icon" icon={<FontAwesomeIcon icon={['far', 'star'] as unknown as IconLookup} />} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 12, fontSize: 14 }}>Mode: text (with label + icon)</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Badge label="User" color="sage" style="primary" size="lg" mode="text" showIcon icon={<FontAwesomeIcon icon={['far', 'user'] as unknown as IconLookup} />} />
          <Badge label="Fav" color="info" style="primary" size="lg" mode="text" showIcon icon={<FontAwesomeIcon icon={['far', 'heart'] as unknown as IconLookup} />} />
          <Badge label="Rate" color="success" style="primary" size="lg" mode="text" showIcon icon={<FontAwesomeIcon icon={['far', 'star'] as unknown as IconLookup} />} />
        </div>
      </div>
    </div>
  )
};
