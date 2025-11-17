import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Badge from './Badge.vue'

const colorOptions = [
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
] as const

const sizeOptions = ['lg', 'sm', 'xs'] as const
const iconOptions = ['face', 'notifications', 'favorite', 'event'] as const

const meta = {
  title: 'Electrons/Badge',
  component: Badge,
  tags: ['autodocs', 'electrons'],
  argTypes: {
    color: { control: { type: 'select' }, options: colorOptions },
    size: { control: { type: 'select' }, options: sizeOptions },
    icon: { control: { type: 'select' }, options: iconOptions },
    variant: { control: { type: 'select' }, options: ['primary', 'secondary'] }
  },
  args: {
    color: 'sage',
    size: 'lg',
    variant: 'primary',
    icon: undefined,
    number: undefined
  },
  decorators: [
    () => ({
      template: `
        <div
          style="
            display:flex;
            flex-wrap:wrap;
            gap:var(--space-lg);
            align-items:center;
            background:var(--color-background-alt);
            padding:var(--space-2xl);
            border-radius:var(--radius-xl);
          "
        >
          <story/>
        </div>
      `
    })
  ]
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <Badge icon="face" color="sage">Primary</Badge>
      <Badge variant="secondary" icon="face" color="sage">Secondary</Badge>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <Badge icon="face" size="lg">Large</Badge>
      <Badge icon="face" size="sm">Small</Badge>
      <Badge icon="face" size="xs">XSmall</Badge>
    `
  })
}

export const Colors: Story = {
  render: () => ({
    components: { Badge },
    setup() {
      const colors = colorOptions
      return { colors, sizes: sizeOptions }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:var(--space-xl)">
        <template v-for="color in colors" :key="color">
          <div style="display:flex;flex-direction:column;gap:var(--space-sm)">
            <h3 style="text-transform:capitalize;margin:0">{{ color }}</h3>
            <div style="display:flex;flex-wrap:wrap;gap:var(--space-sm)">
              <template v-for="size in sizes" :key="size">
                <Badge :color="color" :size="size" icon="face">{{ size }}</Badge>
                <Badge variant="secondary" :color="color" :size="size" icon="face">{{ size }}</Badge>
              </template>
            </div>
          </div>
        </template>
      </div>
    `
  })
}

export const WithNumber: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <Badge size="lg" number="+999" />
      <Badge size="sm" number="42" />
      <Badge size="xs" number="1" />
    `
  })
}
