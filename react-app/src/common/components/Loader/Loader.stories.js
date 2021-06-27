import React from 'react';
import Loader from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
  argTypes: {
    message: {
      control: { type: 'text' },
    },
    children: {
      control: { type: null },
    },
    variant: {
      control: {
        type: 'inline-radio',
        options: [
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
        ],
      },
    },
    animation: {
      control: { type: 'inline-radio', options: ['border', 'grow'] },
    },
    size: {
      control: { type: 'inline-radio', options: { none: undefined, sm: 'sm' } },
    },
  },
};

export const Basic = (args) => <Loader {...args} />;

Basic.args = {
  size: undefined,
  variant: 'secondary',
  animation: 'border',
};
