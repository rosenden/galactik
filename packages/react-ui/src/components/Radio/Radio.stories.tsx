import React from 'react';
import { Radio, RadioProps } from './Radio';

export default {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

const Template = (args: RadioProps) => <Radio {...args} />;

export const Default = Template.bind({});
Default.args = {
  checked: false,
  label: 'Radio',
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  label: 'Checked',
};

export const Disabled = Template.bind({});
Disabled.args = {
  checked: false,
  disabled: true,
  label: 'Disabled',
};

export const CheckedDisabled = Template.bind({});
CheckedDisabled.args = {
  checked: true,
  disabled: true,
  label: 'Checked & Disabled',
};
