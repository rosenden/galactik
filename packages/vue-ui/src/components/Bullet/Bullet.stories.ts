import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Bullet from './Bullet.vue';

type BulletSize = 'xsmall' | 'small' | 'medium';
type BulletColor = 'sage' | 'pink' | 'almond' | 'grey' | 'success' | 'warning' | 'info' | 'error';

const colorOptions: BulletColor[] = ['sage', 'pink', 'almond', 'grey', 'success', 'warning', 'info', 'error'];
const sizeOptions: BulletSize[] = ['xsmall', 'small', 'medium'];

const meta = {
  title: 'Electrons/Bullet',
  component: Bullet,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: sizeOptions,
      description: 'Bullet size: xsmall (6px), small (10px), medium (18px)'
    },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'Bullet color'
    },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'Variant: filled (primary) or light (secondary)'
    }
  },
  args: {
    size: 'small',
    color: 'sage',
    variant: 'primary'
  }
} satisfies Meta<typeof Bullet>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * @example
 * ```vue
 * <script setup>
 * import { Bullet } from '@/components/Bullet';
 * </script>
 * 
 * <template>
 *   <!-- Simple bullet -->
 *   <Bullet color="sage" size="small" />
 * 
 *   <!-- Bullet inside a list -->
 *   <ul style="list-style: none; padding: 0;">
 *     <li style="display: flex; align-items: center; gap: 8px;">
 *       <Bullet color="success" size="small" />
 *       <span>Task completed</span>
 *     </li>
 *     <li style="display: flex; align-items: center; gap: 8px;">
 *       <Bullet color="warning" size="small" />
 *       <span>In progress</span>
 *     </li>
 *     <li style="display: flex; align-items: center; gap: 8px;">
 *       <Bullet color="error" size="small" />
 *       <span>Blocked</span>
 *     </li>
 *   </ul>
 * 
 *   <!-- Different sizes -->
 *   <Bullet color="indigo" size="xsmall" />
 *   <Bullet color="indigo" size="small" />
 *   <Bullet color="indigo" size="medium" />
 * </template>
 * ```
 */

/**
 * Interactive playground for the component
 */
export const Playground: Story = {};

/**
 * Available color palette
 */
export const Colors: Story = {
  render: () => ({
    components: { Bullet },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center; width: 100%;">
        <div 
          v-for="color in colors" 
          :key="color" 
          style="display: flex; flex-direction: column; align-items: center; gap: 8px;"
        >
          <Bullet :color="color" size="medium" />
          <span style="font-size: 11px; color: var(--color-font-neutral-base);">{{ color }}</span>
        </div>
      </div>
    `,
    setup() {
      return { colors: colorOptions };
    }
  })
};

/**
 * Comparaison des tailles
 */
export const Sizes: Story = {
  render: () => ({
    components: { Bullet },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px;">
        <div>
          <h3 style="margin-bottom: 16px; font-size: 14px; font-weight: 600; color: var(--color-font-primary-base);">
            Size comparison
          </h3>
          <div style="display: flex; align-items: center; gap: 32px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <Bullet size="medium" color="sage" />
              <div style="text-align: center;">
                <div style="font-size: 12px; font-weight: 600; color: var(--color-font-neutral-base);">medium</div>
                <div style="font-size: 10px; color: var(--color-font-neutral-muted);">18px (r=9px + r=5px)</div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <Bullet size="small" color="sage" />
              <div style="text-align: center;">
                <div style="font-size: 12px; font-weight: 600; color: var(--color-font-neutral-base);">small</div>
                <div style="font-size: 10px; color: var(--color-font-neutral-muted);">10px (r=5px + r=3px)</div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <Bullet size="xsmall" color="sage" />
              <div style="text-align: center;">
                <div style="font-size: 12px; font-weight: 600; color: var(--color-font-neutral-base);">xsmall</div>
                <div style="font-size: 10px; color: var(--color-font-neutral-muted);">6px (r=3px)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })
};

/**
 * Example usage in a list
 */
export const InList: Story = {
  render: () => ({
    components: { Bullet },
    template: `
      <div style="padding: 24px;">
        <h3 style="margin-bottom: 16px; font-size: 14px; font-weight: 600; color: var(--color-font-primary-base);">
          List with bullets
        </h3>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
          <li style="display: flex; align-items: center; gap: 12px;">
            <Bullet color="success" size="small" />
            <span style="font-size: 14px; color: var(--color-font-neutral-base);">First list item</span>
          </li>
          <li style="display: flex; align-items: center; gap: 12px;">
            <Bullet color="success" size="small" />
            <span style="font-size: 14px; color: var(--color-font-neutral-base);">Second list item</span>
          </li>
          <li style="display: flex; align-items: center; gap: 12px;">
            <Bullet color="success" size="small" />
            <span style="font-size: 14px; color: var(--color-font-neutral-base);">Third list item</span>
          </li>
          <li style="display: flex; align-items: center; gap: 12px;">
            <Bullet color="info" size="small" />
            <span style="font-size: 14px; color: var(--color-font-neutral-base);">Item using info color</span>
          </li>
          <li style="display: flex; align-items: center; gap: 12px;">
            <Bullet color="warning" size="small" />
            <span style="font-size: 14px; color: var(--color-font-neutral-base);">Item using warning color</span>
          </li>
          <li style="display: flex; align-items: center; gap: 12px;">
            <Bullet color="error" size="small" />
            <span style="font-size: 14px; color: var(--color-font-neutral-base);">Item using error color</span>
          </li>
        </ul>
      </div>
    `
  })
};

/**
 * All color and size combinations
 */
export const AllCombinations: Story = {
  render: () => ({
    components: { Bullet },
    template: `
      <div style="padding: 24px;">
        <div v-for="size in sizes" :key="size" style="margin-bottom: 32px;">
          <h3 style="margin-bottom: 16px; font-size: 14px; font-weight: 600; color: var(--color-font-primary-base); text-transform: capitalize;">
            Size: {{ size }}
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 24px;">
            <div 
              v-for="color in colors" 
              :key="color" 
              style="display: flex; flex-direction: column; align-items: center; gap: 8px;"
            >
              <Bullet :color="color" :size="size" />
              <span style="font-size: 11px; color: var(--color-font-neutral-base);">{{ color }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
    setup() {
      return { 
        colors: colorOptions,
        sizes: sizeOptions
      };
    }
  })
};
