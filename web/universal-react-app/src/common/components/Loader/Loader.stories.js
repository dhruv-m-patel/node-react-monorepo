import React from 'react';
import Loader from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
  argTypes: {
    children: {
      control: { type: null },
    },
    color: {
      control: { type: 'inline-radio', options: ['primary', 'secondary'] },
    },
    size: { control: { type: 'number' } },
    thickness: { control: { type: 'number' } },
    message: { control: { type: 'text' } },
    value: { control: { type: 'number' } },
    variant: {
      control: {
        type: 'inline-radio',
        options: ['determinate', 'indeterminate', 'static'],
      },
    },
  },
};

export const Basic = (args) => <Loader {...args} />;

Basic.args = {
  size: 30,
  thickness: 3,
  variant: 'indeterminate',
};
