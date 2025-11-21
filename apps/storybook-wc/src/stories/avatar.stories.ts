import type { Meta, StoryObj } from '@storybook/web-components';

type Args = {
  name: string;
  src?: string;
  icon?: string;
  size: 'small' | 'medium' | 'large';
  variant: 'primary' | 'secondary';
  avatarColor: 'sage' | 'almond' | 'pink' | 'grey' | 'info' | 'error' | 'success' | 'warning' | 'indigo' | 'yellow' | 'cherry' | 'cyan';
  status: 'none' | 'online' | 'away' | 'busy' | 'offline';
};

// Color options aligned with React
const colorOptions: Args['avatarColor'][] = [
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

const meta: Meta<Args> = {
  title: 'Electrons/Avatar',
  parameters: { 
    layout: 'padded',
    docs: {
      description: {
        component: 'Avatar component synchronized with Figma Design System via MCP'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    size: { 
      control: 'inline-radio', 
      options: ['small', 'medium', 'large'],
      description: 'Taille de l\'avatar (24px, 32px, 48px)'
    },
    variant: { 
      control: 'inline-radio', 
      options: ['primary', 'secondary'],
      description: 'Variant (primary/secondary)'
    },
    avatarColor: {
      control: 'select',
      options: colorOptions,
      description: 'Couleur badge (synced MCP)'
    },
    status: { 
      control: 'inline-radio', 
      options: ['none', 'online', 'away', 'busy', 'offline'] 
    },
    name: { 
      control: 'text',
      description: 'Full name used to generate initials'
    },
    src: { 
      control: 'text',
      description: 'URL de l\'image (si vide, affiche les initiales)'
    },
    icon: {
      control: 'text',
      description: 'Font Awesome icon class (ex: "fas fa-user")'
    }
  },
  args: {
    name: 'Xavier Xu',
    size: 'medium',
    variant: 'primary',
    avatarColor: 'sage',
    status: 'none'
  }
};

export default meta;
type Story = StoryObj<Args>;

const render = (args: Args) => {
  const attrs = [
    `name="${args.name}"`,
    `size="${args.size}"`,
    `variant="${args.variant}"`,
    `avatar-color="${args.avatarColor}"`,
    `status="${args.status}"`
  ];

  if (args.src) {
    attrs.push(`src="${args.src}"`);
  }

  return `<gal-avatar ${attrs.join(' ')}></gal-avatar>`;
};

// Playground (first story with controls)
export const Playground: Story = { render };

// Palette Primary Color
export const PalettePrimary: Story = {
  name: 'Primary Color',
  render: () => {
    const items = colorOptions.map((color) => {
      const name = `${color[0].toUpperCase()}${color.slice(1)} ${color[0].toUpperCase()}`;
      return `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <gal-avatar name="${name}" size="large" avatar-color="${color}" variant="primary"></gal-avatar>
          <div style="font-size: 11px; text-align: center; font-family: monospace;">
            <div style="font-weight: 600;">${color}</div>
          </div>
        </div>
      `;
    }).join('');
    
    return `
      <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px;">
        ${items}
      </div>
    `;
  }
};

// Palette Secondary Color
export const PaletteSecondary: Story = {
  name: 'Secondary Color',
  render: () => {
    const items = colorOptions.map((color) => {
      const name = `${color[0].toUpperCase()}${color.slice(1)} ${color[0].toUpperCase()}`;
      return `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <gal-avatar name="${name}" size="large" avatar-color="${color}" variant="secondary"></gal-avatar>
          <div style="font-size: 11px; text-align: center; font-family: monospace;">
            <div style="font-weight: 600;">${color}</div>
          </div>
        </div>
      `;
    }).join('');
    
    return `
      <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px;">
        ${items}
      </div>
    `;
  }
};

// Tailles - Organisation comme Badge
export const Sizes: Story = {
  render: () => {
    const sizes: Args['size'][] = ['small', 'medium', 'large'];
    const sections = sizes.map((size) => {
      const avatars = colorOptions.map((color) => {
        const name = `${color[0].toUpperCase()}${color.slice(1)} ${color[0].toUpperCase()}`;
        return `<gal-avatar name="${name}" size="${size}" avatar-color="${color}" variant="primary"></gal-avatar>`;
      }).join('');
      
      return `
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; text-transform: uppercase; color: var(--color-font-primary-base);">${size}</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            ${avatars}
          </div>
        </div>
      `;
    }).join('');
    
    return `<div style="display: flex; flex-direction: column; gap: 24px;">${sections}</div>`;
  }
};

// Avec images
export const WithImage: Story = {
  name: 'With Images',
  render: () => {
    const sampleImages = [
      'https://i.pravatar.cc/300?img=1',
      'https://i.pravatar.cc/300?img=5',
      'https://i.pravatar.cc/300?img=12',
      'https://i.pravatar.cc/300?img=33'
    ];
    const sizes: Args['size'][] = ['large', 'medium', 'small'];
    
    const sections = sizes.map((size) => {
      const avatars = sampleImages.map((src, idx) => {
        return `<gal-avatar name="Person ${idx + 1}" src="${src}" size="${size}"></gal-avatar>`;
      }).join('');
      
      return `
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; text-transform: uppercase; color: var(--color-font-primary-base);">${size}</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            ${avatars}
          </div>
        </div>
      `;
    }).join('');
    
    return `<div style="display: flex; flex-direction: column; gap: 24px;">${sections}</div>`;
  }
};

// With Font Awesome icons
export const WithIcons: Story = {
  name: 'With Icons',
  render: () => {
    const iconExamples = [
      { icon: 'fas fa-user', label: 'User', color: 'sage' },
      { icon: 'fas fa-building', label: 'Building', color: 'info' },
      { icon: 'fas fa-cog', label: 'Settings', color: 'grey' },
      { icon: 'fas fa-heart', label: 'Heart', color: 'error' },
      { icon: 'fas fa-star', label: 'Star', color: 'warning' },
      { icon: 'fas fa-bell', label: 'Bell', color: 'yellow' }
    ];
    
    const primaryAvatars = iconExamples.map((example) => `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <gal-avatar icon="${example.icon}" size="medium" avatar-color="${example.color}" variant="primary" alt="${example.label}"></gal-avatar>
        <span style="font-size: 10px; color: var(--color-font-neutral-muted);">${example.label}</span>
      </div>
    `).join('');
    
    const secondaryAvatars = iconExamples.map((example) => `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <gal-avatar icon="${example.icon}" size="medium" avatar-color="${example.color}" variant="secondary" alt="${example.label}"></gal-avatar>
        <span style="font-size: 10px; color: var(--color-font-neutral-muted);">${example.label}</span>
      </div>
    `).join('');
    
    return `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: var(--color-font-primary-base);">Primary Variant</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            ${primaryAvatars}
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: var(--color-font-primary-base);">Secondary Variant</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            ${secondaryAvatars}
          </div>
        </div>
      </div>
    `;
  }
};


