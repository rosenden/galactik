import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Badge from './Badge.vue';

type BadgeColor = 
  | 'sage'
  | 'almond'
  | 'pink'
  | 'grey'
  | 'info'
  | 'error'
  | 'success'
  | 'warning'
  | 'indigo'
  | 'yellow'
  | 'cherry'
  | 'cyan';

const colorOptions: BadgeColor[] = [
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
      description: 'Badge size (xs/sm/lg tokens)'
    },
    color: {
      options: colorOptions,
      control: { type: 'select' },
      description: 'Theme (Portal semantic tokens)'
    },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'inline-radio' },
      description: 'Filled or outlined style'
    },
    label: {
      control: { type: 'number' },
      description: 'Displayed number'
    },
    showIcon: {
      control: 'boolean',
      description: 'Displays the icon passed through the icon prop'
    },
    mode: {
      options: ['icon', 'number', 'text'],
      control: { type: 'inline-radio' },
      description: 'Display mode: icon, number, text'
    }
  },
  args: {
    label: 1,
    size: 'sm',
    color: 'sage',
    variant: 'primary',
    showIcon: false,
    mode: 'text'
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * @example
 * ```vue
 * <script setup>
 * import { Badge } from '@/components/Badge';
 * </script>
 * 
 * <template>
 *   <!-- Badge with plain text -->
 *   <Badge variant="filled" color="sage">Active</Badge>
 * 
 *   <!-- Badge with Font Awesome icon -->
 *   <Badge variant="outlined" color="error">
 *     <template #icon>
 *       <i class="fa-solid fa-circle-exclamation"></i>
 *     </template>
 *     Alert
 *   </Badge>
 * 
 *   <!-- Badge secondary variant -->
 *   <Badge variant="filled" color="indigo" palette="secondary">
 *     Beta
 *   </Badge>
 * 
 *   <!-- Badge outline -->
 *   <Badge variant="outlined" color="success">
 *     Completed
 *   </Badge>
 * </template>
 * ```
 */

// Playground (first story with controls)
export const Playground: Story = {};

export const PalettePrimary: Story = {
  name: 'Primary Color',
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
        <Badge v-for="color in colors" :key="color" :label="1" :color="color" variant="primary" size="sm" />
      </div>
    `,
    setup() {
      return { colors: colorOptions };
    }
  })
};

export const PaletteSecondary: Story = {
  name: 'Secondary Color',
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
        <Badge v-for="color in colors" :key="color" :label="1" :color="color" variant="secondary" size="sm" />
      </div>
    `,
    setup() {
      return { colors: colorOptions };
    }
  })
};

export const Sizes: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; color: var(--color-font-primary-base);">XS - Numbers</h3>
          <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
            <Badge 
              v-for="(color, idx) in colors" 
              :key="'xs-' + color" 
              :label="idx + 1" 
              :color="color" 
              variant="primary" 
              size="xs" 
              mode="number" 
            />
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; color: var(--color-font-primary-base);">SM - Numbers</h3>
          <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
            <Badge 
              v-for="(color, idx) in colors" 
              :key="'sm-' + color" 
              :label="idx + 1" 
              :color="color" 
              variant="primary" 
              size="sm" 
              mode="number" 
            />
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 12px; font-size: 14px; color: var(--color-font-primary-base);">LG - Numbers</h3>
          <div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px;">
            <Badge 
              v-for="(color, idx) in colors" 
              :key="'lg-' + color" 
              :label="idx + 1" 
              :color="color" 
              variant="primary" 
              size="lg" 
              mode="number" 
            />
          </div>
        </div>
      </div>
    `,
    setup() {
      return { colors: colorOptions };
    }
  })
};

export const WithIcon: Story = {
  name: 'With Icons',
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px;">
          <Badge 
            v-for="(color, idx) in colors" 
            :key="'lg-icon-' + color"
            :color="color" 
            variant="primary" 
            size="lg"
            mode="icon"
            :icon="sampleIcons[idx % sampleIcons.length]"
          />
        </div>
      </div>
    `,
    setup() {
      const sampleIcons = [
        'fas fa-user',
        'fas fa-heart',
        'fas fa-star',
        'fas fa-bell',
        'fas fa-cog',
        'fas fa-check',
        'fas fa-times',
        'fas fa-plus',
        'fas fa-minus',
        'fas fa-search',
        'fas fa-download',
        'fas fa-upload'
      ];
      return { colors: colorOptions, sampleIcons };
    }
  })
};
