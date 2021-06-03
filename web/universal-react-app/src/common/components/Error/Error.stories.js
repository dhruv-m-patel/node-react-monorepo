import React from 'react';
import Error from './Error';

export default {
  title: 'Components/Error',
  component: Error,
  argTypes: {
    message: { control: { type: 'text' } },
  },
};

export const Default = (args) => <Error {...args} />;

Default.args = {
  message: 'There was an unexpected error.',
};
