import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarProps } from 'react-ui/components/Avatar/Avatar';

const meta: Meta<AvatarProps> = {
  title: 'Electrons/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg']
    },
    variant: {
      control: { type: 'select' },
      options: [
        'primary','primaryLight','secondary',
        'accent','accentSoft','cherry',
        'success','warning','info','error',
        'indigo','indigoAlt','neutralDark','yellow','cyan'
      ]
    },
    status: {
      control: { type: 'inline-radio' },
      options: ['none','online','away','busy','offline']
    },
    src: { control: 'text' },
    name: { control: 'text' }
  },
  args: {
    name: 'Xavier Xu',
    size: 'md',
    variant: 'primary',
    status: 'none'
  }
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Playground: Story = {
  args: {
    variant: 'primary'
  }
};

export const Matrix: Story = {
  name: 'Matrix (variants × tailles)',
  render: (args) => {
    const variants: AvatarProps['variant'][] = [
      'primary','primaryLight','secondary',
      'accent','accentSoft','cherry',
      'success','warning','info','error',
      'indigo','indigoAlt','neutralDark','yellow','cyan'
    ];
    const sizes: AvatarProps['size'][] = ['lg','md','sm'];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {variants.map((v) => (
          <div key={v} style={{ display: 'grid', gap: 16 }}>
            {sizes.map((s) => (
              <div key={`${v}-${s}`} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar {...args} variant={v} size={s} name="XX" />
                <code style={{ fontSize: 12 }}>{v} · {s}</code>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
};

export const WithImageAndStatus: Story = {
  args: {
    name: 'Alicia Baker',
    src: 'https://i.pravatar.cc/300?img=5',
    size: 'lg',
    variant: 'indigo',
    status: 'online'
  }
};
