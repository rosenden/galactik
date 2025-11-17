import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Avatar from './Avatar.vue';

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
] as const;
const fallbackImage = 'https://i.pravatar.cc/150?img=10';

const meta = {
  title: 'Electrons/Avatar',
  component: Avatar,
  excludeStories: /.*Data$/,
  tags: ['autodocs', 'electrons'],
  argTypes: {
    color: {
      options: colorOptions,
      control: { type: 'select' },
    },
    variant: {
      options: ['primary', 'secondary', 'picture', 'icon'],
      control: { type: 'select' },
    },
    size: {
      options: ['lg', 'md', 'sm', 'xs'],
      control: { type: 'select' },
    },
    icon: {
      control: { type: 'text' }
    },
  },
  decorators: [
    () => ({
      template: `
        <div
          style="
            display:flex;
            gap:var(--space-3xl);
            align-items:flex-end;
            flex-wrap:wrap;
            background:var(--color-background-surface);
            padding:var(--space-4xl);
            border-radius:var(--radius-2xl);
            border:1px solid var(--color-border-base);
          "
        >
          <story/>
        </div>
      `,
    }),
  ],
  args: {
    label: 'John Doe',
  },
} as Meta<typeof Avatar>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}

export const Variants: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div
        style="
          display:flex;
          gap:var(--space-lg);
          background:var(--color-background-alt);
          padding:var(--space-lg);
          border-radius:var(--radius-lg);
          border:1px solid var(--color-border-base);
        "
      >
        <Avatar label="John Doe" />
        <Avatar variant="secondary" label="John Doe" />
      </div>
      `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div
        style="
          display:flex;
          gap:var(--space-lg);
          background:var(--color-background-alt);
          padding:var(--space-lg);
          border-radius:var(--radius-lg);
          border:1px solid var(--color-border-base);
        "
      >
        <Avatar label="John Doe" size="lg" />
        <Avatar label="John Doe" size="md" />
        <Avatar label="John Doe" size="sm" />
        <Avatar label="John Doe" size="xs" />
      </div>
      `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { Avatar },
    setup() {
      const colors = colorOptions;
      const sizes = ['lg', 'md', 'sm'];
      return { colors, sizes };
    },
    template: `
        <div
          style="
            display:flex;
            gap:var(--space-3xl);
            flex-wrap:wrap;
          "
        >
            <template v-for="color in colors" :key="color">
              <div style="display:flex;flex-direction:column;gap:var(--space-lg)">
                <h3 style="font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold);text-transform:capitalize;">
                  {{ color }}
                </h3>
                <div style="display:flex;flex-direction:column;gap:var(--space-md)">
                  <div style="display:flex;gap:var(--space-md);align-items:flex-end;">
                    <template v-for="size in sizes" :key="size">
                      <Avatar :color="color" :size="size" label="John Doe" />
                    </template>
                  </div>
                  <div style="display:flex;gap:var(--space-md);align-items:flex-end;">
                    <template v-for="size in sizes" :key="size">
                      <Avatar variant="secondary" :color="color" :size="size" label="John Doe" />
                    </template>
                  </div>
                </div>
              </div>
            </template>
        </div>
      `,
  }),
};

export const Labels: Story = {
  render: () => ({
    components: { Avatar },
    setup() {
      const labels = [
        'John Doe',
        'Jane Doe Remy',
        'jean paul',
        'JP',
        'Henry',
        'X',
        'XX',
        'XXX',
      ];
      return { labels };
    },
    template: `
        <div v-for="label in labels" :key="label" style="margin-bottom:var(--space-lg)">
          <h3 style="font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold)">{{ label }}</h3>
          <div style="display:flex;gap:var(--space-lg);align-items:flex-end">
            <Avatar size="lg" :label="label" />
            <Avatar size="sm" :label="label" />
            <Avatar size="xs" :label="label" />
          </div>
        </div>
      `,
  }),
};

export const Images: Story = {
  render: () => ({
    components: { Avatar },
    setup() {
      const sizes = ['lg', 'md', 'sm', 'xs'];
      const alt = 'John Doe';
      const img = fallbackImage;
      return { sizes, img, alt };
    },
    template: `
      <div
        style="
          display:flex;
          gap:var(--space-lg);
          align-items:flex-end;
          background:var(--color-background-alt);
          padding:var(--space-lg);
          border-radius:var(--radius-lg);
          border:1px solid var(--color-border-base);
        "
      >
        <Avatar
          v-for="size in sizes"
          :key="size"
          variant="picture"
          :size="size"
          :img="img"
          :alt="alt"
        />
      </div>
      `,
  }),
};

export const Icons: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div
        style="
          display:flex;
          gap:var(--space-lg);
          background:var(--color-background-alt);
          padding:var(--space-lg);
          border-radius:var(--radius-lg);
          border:1px solid var(--color-border-base);
          align-items:flex-end;
        "
      >
        <Avatar variant="icon" icon="user" />
        <Avatar variant="icon" icon="bell" size="sm" />
        <Avatar variant="icon" icon="heart" size="md" color="pink" />
        <Avatar variant="icon" icon="calendar" size="lg" color="almond" />
      </div>
    `,
  }),
};
