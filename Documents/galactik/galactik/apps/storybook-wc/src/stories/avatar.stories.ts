import type { Meta, StoryObj } from '@storybook/web-components';

type Args = {
  name: string;
  src?: string;
  size: 'sm' | 'md' | 'lg';
  variant:
    | 'primary' | 'primaryLight' | 'secondary'
    | 'accent' | 'accentSoft' | 'cherry'
    | 'success' | 'warning' | 'info' | 'error'
    | 'indigo' | 'indigoAlt' | 'neutralDark'
    | 'yellow' | 'cyan';
  status: 'none' | 'online' | 'away' | 'busy' | 'offline';
};

const meta: Meta<Args> = {
  title: 'Electrons/Avatar',
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: {
      control: 'select',
      options: [
        'primary', 'primaryLight', 'secondary',
        'accent', 'accentSoft', 'cherry',
        'success', 'warning', 'info', 'error',
        'indigo', 'indigoAlt', 'neutralDark', 'yellow', 'cyan'
      ]
    },
    status: { control: 'inline-radio', options: ['none', 'online', 'away', 'busy', 'offline'] }
  },
  args: {
    name: 'Salomé Quantum',
    size: 'md',
    variant: 'primary',
    status: 'online'
  }
};

export default meta;
type Story = StoryObj<Args>;

const render = (args: Args) => {
  const attrs = [
    `name="${args.name}"`,
    `size="${args.size}"`,
    `variant="${args.variant}"`,
    `status="${args.status}"`
  ];

  if (args.src) {
    attrs.push(`src="${args.src}"`);
  }

  return `<gal-avatar ${attrs.join(' ')}></gal-avatar>`;
};

export const Playground: Story = { render };

export const WithPhoto: Story = {
  render,
  args: {
    name: 'Eli Quantum',
    src: 'https://i.pravatar.cc/200?img=15',
    size: 'lg',
    variant: 'indigo',
    status: 'away'
  }
};
