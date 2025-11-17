import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Badge from '../components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: 'radio',
      description: 'Size of the badge'
    },
    color: {
      options: ['pink', 'orange', 'green', 'blue', 'red', 'yellow', 'cyan', 'indigo', 'cherry', 'sage', 'grey', 'almond'],
      control: 'select',
      description: 'Color theme of the badge'
    },
    style: {
      options: ['primary', 'secondary'],
      control: 'radio',
      description: 'Style variant (filled or outlined)'
    },
    label: {
      control: 'text',
      description: 'Text displayed in the badge'
    },
    showIcon: {
      control: 'boolean',
      description: 'Show icon indicator'
    },
    showFlag: {
      control: 'boolean',
      description: 'Show flag/dot indicator'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Basic badge
export const Default: Story = {
  args: {
    label: 'Badge',
    size: 'medium',
    color: 'pink',
    style: 'primary'
  }
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Badge label="Small" size="small" color="pink" />
      <Badge label="Medium" size="medium" color="pink" />
      <Badge label="Large" size="large" color="pink" />
    </div>
  )
};

// Color variants - Primary style
export const ColorsPrimary: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Badge label="Pink" color="pink" style="primary" />
      <Badge label="Orange" color="orange" style="primary" />
      <Badge label="Green" color="green" style="primary" />
      <Badge label="Blue" color="blue" style="primary" />
      <Badge label="Red" color="red" style="primary" />
      <Badge label="Yellow" color="yellow" style="primary" />
      <Badge label="Cyan" color="cyan" style="primary" />
      <Badge label="Indigo" color="indigo" style="primary" />
      <Badge label="Cherry" color="cherry" style="primary" />
      <Badge label="Sage" color="sage" style="primary" />
      <Badge label="Grey" color="grey" style="primary" />
      <Badge label="Almond" color="almond" style="primary" />
    </div>
  )
};

// Color variants - Secondary style
export const ColorsSecondary: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Badge label="Pink" color="pink" style="secondary" />
      <Badge label="Orange" color="orange" style="secondary" />
      <Badge label="Green" color="green" style="secondary" />
      <Badge label="Blue" color="blue" style="secondary" />
      <Badge label="Red" color="red" style="secondary" />
      <Badge label="Yellow" color="yellow" style="secondary" />
      <Badge label="Cyan" color="cyan" style="secondary" />
      <Badge label="Indigo" color="indigo" style="secondary" />
      <Badge label="Cherry" color="cherry" style="secondary" />
      <Badge label="Sage" color="sage" style="secondary" />
      <Badge label="Grey" color="grey" style="secondary" />
      <Badge label="Almond" color="almond" style="secondary" />
    </div>
  )
};

// With flag indicator
export const WithFlag: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Badge label="Active" color="green" showFlag={true} />
      <Badge label="Pending" color="orange" showFlag={true} />
      <Badge label="Error" color="red" showFlag={true} />
      <Badge label="Info" color="blue" showFlag={true} />
    </div>
  )
};

// Combined - Size + Color + Flag
export const Combined: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">Small + Flag</h3>
        <div className="flex gap-2 items-center flex-wrap">
          <Badge label="Success" size="small" color="green" showFlag={true} />
          <Badge label="Warning" size="small" color="yellow" showFlag={true} />
          <Badge label="Error" size="small" color="red" showFlag={true} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Medium + Flag</h3>
        <div className="flex gap-2 items-center flex-wrap">
          <Badge label="Success" size="medium" color="green" showFlag={true} />
          <Badge label="Warning" size="medium" color="yellow" showFlag={true} />
          <Badge label="Error" size="medium" color="red" showFlag={true} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Large + Flag</h3>
        <div className="flex gap-2 items-center flex-wrap">
          <Badge label="Success" size="large" color="green" showFlag={true} />
          <Badge label="Warning" size="large" color="yellow" showFlag={true} />
          <Badge label="Error" size="large" color="red" showFlag={true} />
        </div>
      </div>
    </div>
  )
};

// Playground story for interactive testing
export const Playground: Story = {
  args: {
    label: 'Interactive Badge',
    size: 'medium',
    color: 'pink',
    style: 'primary',
    showIcon: false,
    showFlag: false
  }
};
