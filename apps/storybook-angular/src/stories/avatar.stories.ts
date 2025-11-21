import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AvatarComponent } from 'angular-ui/components/avatar/avatar.component';

type AvatarColor = 'sage' | 'almond' | 'pink' | 'grey' | 'success' | 'cherry' | 'warning' | 'indigo' | 'info' | 'yellow' | 'error' | 'cyan';

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

type Story = StoryObj<AvatarComponent>;

const meta: Meta<AvatarComponent> = {
  title: 'Electrons/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AvatarComponent]
    })
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `@example
\`\`\`html
<!-- Avatar with initials (Figma colors by default) -->
<oc-avatar name="Alice Smith" size="medium"></oc-avatar>

<!-- Avatar with image -->
<oc-avatar 
  name="Clara White"
  src="https://example.com/photo.jpg"
  size="large">
</oc-avatar>

<!-- Different sizes -->
<oc-avatar name="John Doe" size="small"></oc-avatar>
<oc-avatar name="Jane Doe" size="medium"></oc-avatar>
<oc-avatar name="Jack Doe" size="large"></oc-avatar>

<!-- Profile with avatar -->
<div style="display: flex; align-items: center; gap: 12px">
  <oc-avatar name="Emma Wilson" size="large"></oc-avatar>
  <div>
    <div style="font-weight: 600">Emma Wilson</div>
    <div style="font-size: 12px; color: var(--color-font-neutral-muted)">Designer</div>
  </div>
</div>
\`\`\`
`
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['small', 'medium', 'large'],
      description: 'Avatar size (24px, 32px, 48px)'
    },
    name: {
      control: 'text',
      description: 'Full name used to generate initials'
    },
    src: {
      control: 'text',
      description: 'Image URL (falls back to initials if empty)'
    },
    avatarColor: {
      control: 'select',
      options: colorOptions,
      description: 'Avatar color (synced MCP tokens)'
    },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'Variant'
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

// Playground (first story with controls)
export const Playground: Story = {};

// Palette Primary Color
export const PalettePrimary: Story = {
  name: 'Primary Color',
  render: () => {
    const avatars = colorOptions.map((color) => {
      const initial = color[0].toUpperCase();
      return `<div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
        <oc-avatar 
          name="${initial}${color.slice(1)} ${initial}"
          size="large"
          avatarColor="${color}"
          variant="primary">
        </oc-avatar>
        <div style="font-size: 11px; text-align: center; font-family: monospace">
          <div style="font-weight: 600">${color}</div>
        </div>
      </div>`;
    }).join('');
    
    return {
      template: `<div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px">${avatars}</div>`
    };
  }
};

// Palette Secondary Color
export const PaletteSecondary: Story = {
  name: 'Secondary Color',
  render: () => {
    const avatars = colorOptions.map((color) => {
      const initial = color[0].toUpperCase();
      return `<div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
        <oc-avatar 
          name="${initial}${color.slice(1)} ${initial}"
          size="large"
          avatarColor="${color}"
          variant="secondary">
        </oc-avatar>
        <div style="font-size: 11px; text-align: center; font-family: monospace">
          <div style="font-weight: 600">${color}</div>
        </div>
      </div>`;
    }).join('');
    
    return {
      template: `<div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px">${avatars}</div>`
    };
  }
};

// Tailles - Organisation comme Badge
export const Sizes: Story = {
  render: () => {
    const sizes = ['small', 'medium', 'large'];
    const sections = sizes.map((size) => {
      const avatars = colorOptions.map((color) => {
        const initial = color[0].toUpperCase();
        return `<oc-avatar 
          name="${initial}${color.slice(1)} ${initial}"
          size="${size}"
          avatarColor="${color}"
          variant="primary">
        </oc-avatar>`;
      }).join('');
      
      return `<div>
        <h3 style="margin-bottom: 12px; font-size: 14px; text-transform: uppercase; color: var(--color-font-primary-base)">${size}</h3>
        <div style="display: flex; gap: 12px; flex-wrap: wrap">${avatars}</div>
      </div>`;
    }).join('');
    
    return {
      template: `<div style="display: flex; flex-direction: column; gap: 24px">${sections}</div>`
    };
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
    const sizes = ['large', 'medium', 'small'];
    
    const sections = sizes.map((size) => {
      const avatars = sampleImages.map((src, idx) => {
        return `<oc-avatar 
          name="Person ${idx + 1}"
          src="${src}"
          size="${size}">
        </oc-avatar>`;
      }).join('');
      
      return `<div>
        <h3 style="margin-bottom: 12px; font-size: 14px; text-transform: uppercase; color: var(--color-font-primary-base)">${size}</h3>
        <div style="display: flex; gap: 12px; flex-wrap: wrap">${avatars}</div>
      </div>`;
    }).join('');
    
    return {
      template: `<div style="display: flex; flex-direction: column; gap: 24px">${sections}</div>`
    };
  }
};

// With Font Awesome icons
export const WithIcons: Story = {
  name: 'With Icons',
  render: () => {
    const iconExamples = [
      { icon: 'fa-solid fa-user', label: 'User', color: 'sage' },
      { icon: 'fa-solid fa-building', label: 'Building', color: 'info' },
      { icon: 'fa-solid fa-gear', label: 'Settings', color: 'grey' },
      { icon: 'fa-solid fa-heart', label: 'Heart', color: 'error' },
      { icon: 'fa-solid fa-star', label: 'Star', color: 'warning' },
      { icon: 'fa-solid fa-bell', label: 'Bell', color: 'yellow' }
    ];
    
    const primarySection = iconExamples.map((example) => {
      return `<div style="display: flex; flex-direction: column; align-items: center; gap: 4px">
        <oc-avatar 
          icon="${example.icon}"
          size="medium"
          avatarColor="${example.color}"
          variant="primary"
          alt="${example.label}">
        </oc-avatar>
        <span style="font-size: 10px; color: var(--color-font-neutral-muted)">${example.label}</span>
      </div>`;
    }).join('');
    
    const secondarySection = iconExamples.map((example) => {
      return `<div style="display: flex; flex-direction: column; align-items: center; gap: 4px">
        <oc-avatar 
          icon="${example.icon}"
          size="medium"
          avatarColor="${example.color}"
          variant="secondary"
          alt="${example.label}">
        </oc-avatar>
        <span style="font-size: 10px; color: var(--color-font-neutral-muted)">${example.label}</span>
      </div>`;
    }).join('');
    
    return {
      template: `<div style="display: flex; flex-direction: column; gap: 24px">
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: var(--color-font-primary-base)">Primary Variant</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap">${primarySection}</div>
        </div>
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: var(--color-font-primary-base)">Secondary Variant</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap">${secondarySection}</div>
        </div>
      </div>`
    };
  }
};
