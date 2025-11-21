import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Avatar from './Avatar.vue';

type AvatarColor = 
  | 'sage'
  | 'almond'
  | 'pink'
  | 'grey'
  | 'success'
  | 'cherry'
  | 'warning'
  | 'indigo'
  | 'info'
  | 'yellow'
  | 'error'
  | 'cyan';

// Color options aligned with Badge and React
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
    layout: 'padded'
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
      description: 'Full name used to generate initials'
    },
    src: { 
      control: 'text',
      description: 'Image URL (falls back to initials when empty)'
    },
    avatarColor: {
      control: 'select',
      options: colorOptions,
      description: 'Avatar color (synced to MCP tokens)'
    },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'Variant (primary or secondary)'
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

/**
 * @example
 * ```vue
 * <script setup>
 * import { Avatar } from '@/components/Avatar';
 * </script>
 * 
 * <template>
 *   <!-- Avatar with initials (default Figma colors) -->
 *   <Avatar name="Alice Smith" size="medium" />
 * 
 *   <!-- Avatar with custom colors -->
 *   <Avatar 
 *     name="Bob Jones" 
 *     size="large"
 *     background="#445556"
 *     color="#ffffff"
 *   />
 * 
 *   <!-- Avatar with image -->
 *   <Avatar 
 *     name="Clara White"
 *     src="https://example.com/photo.jpg"
 *     size="large"
 *   />
 * 
 *   <!-- Use avatarColor for design tokens -->
 *   <Avatar 
 *     name="David Miller"
 *     avatar-color="sage"
 *     variant="secondary"
 *   />
 * </template>
 * ```
 */

// Playground (first story with controls)
export const Playground: Story = {};

// Palette Primary Color
export const PalettePrimary: Story = {
  name: 'Primary Color',
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px;">
        <div v-for="color in colors" :key="color" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Avatar 
            :name="color[0].toUpperCase() + color.slice(1) + ' ' + color[0].toUpperCase()"
            size="large"
            :avatar-color="color"
            variant="primary"
          />
          <div style="font-size: 11px; text-align: center; font-family: monospace;">
            <div style="font-weight: 600;">{{ color }}</div>
          </div>
        </div>
      </div>
    `,
    setup() {
      return { colors: colorOptions };
    }
  })
};

// Palette Secondary Color
export const PaletteSecondary: Story = {
  name: 'Secondary Color',
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px;">
        <div v-for="color in colors" :key="color" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Avatar 
            :name="color[0].toUpperCase() + color.slice(1) + ' ' + color[0].toUpperCase()"
            size="large"
            :avatar-color="color"
            variant="secondary"
          />
          <div style="font-size: 11px; text-align: center; font-family: monospace;">
            <div style="font-weight: 600;">{{ color }}</div>
          </div>
        </div>
      </div>
    `,
    setup() {
      return { colors: colorOptions };
    }
  })
};

// Sizes — same layout as Badge
export const Sizes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div v-for="size in sizes" :key="size">
          <h3 style="margin-bottom: 12px; font-size: 14px; text-transform: uppercase; color: var(--color-font-primary-base);">{{ size }}</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <Avatar 
              v-for="color in colors"
              :key="color"
              :name="color[0].toUpperCase() + color.slice(1) + ' ' + color[0].toUpperCase()"
              :size="size"
              :avatar-color="color"
              variant="primary"
            />
          </div>
        </div>
      </div>
    `,
    setup() {
      return { 
        sizes: ['small', 'medium', 'large'],
        colors: colorOptions 
      };
    }
  })
};

// With images
export const WithImage: Story = {
  name: 'With Images',
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div v-for="size in sizes" :key="size">
          <h3 style="margin-bottom: 12px; font-size: 14px; text-transform: uppercase; color: var(--color-font-primary-base);">{{ size }}</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <Avatar 
              v-for="(src, idx) in sampleImages"
              :key="idx"
              :name="'Person ' + (idx + 1)"
              :src="src"
              :size="size"
            />
          </div>
        </div>
      </div>
    `,
    setup() {
      return {
        sizes: ['large', 'medium', 'small'],
        sampleImages: [
          'https://i.pravatar.cc/300?img=1',
          'https://i.pravatar.cc/300?img=5',
          'https://i.pravatar.cc/300?img=12',
          'https://i.pravatar.cc/300?img=33'
        ]
      };
    }
  })
};

// With Font Awesome icons
export const WithIcons: Story = {
  name: 'With Icons',
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: var(--color-font-primary-base);">Primary Variant</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <div 
              v-for="(example, idx) in iconExamples" 
              :key="idx" 
              style="display: flex; flex-direction: column; align-items: center; gap: 4px;"
            >
              <Avatar 
                :icon="example.icon"
                size="medium"
                :avatar-color="example.color"
                variant="primary"
                :alt="example.label"
              />
              <span style="font-size: 10px; color: var(--color-font-neutral-muted);">{{ example.label }}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: var(--color-font-primary-base);">Secondary Variant</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <div 
              v-for="(example, idx) in iconExamples" 
              :key="idx" 
              style="display: flex; flex-direction: column; align-items: center; gap: 4px;"
            >
              <Avatar 
                :icon="example.icon"
                size="medium"
                :avatar-color="example.color"
                variant="secondary"
                :alt="example.label"
              />
              <span style="font-size: 10px; color: var(--color-font-neutral-muted);">{{ example.label }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
    setup() {
      return {
        iconExamples: [
          { icon: 'fas fa-user', label: 'User', color: 'sage' },
          { icon: 'fas fa-building', label: 'Building', color: 'info' },
          { icon: 'fas fa-cog', label: 'Settings', color: 'grey' },
          { icon: 'fas fa-heart', label: 'Heart', color: 'error' },
          { icon: 'fas fa-star', label: 'Star', color: 'warning' },
          { icon: 'fas fa-bell', label: 'Bell', color: 'yellow' }
        ]
      };
    }
  })
};
