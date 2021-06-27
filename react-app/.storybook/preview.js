import React from 'react';
import { GlobalStyle } from '../src/common/components/Page/styles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <React.Fragment>
      <GlobalStyle />
      <Story />
    </React.Fragment>
  ),
];
