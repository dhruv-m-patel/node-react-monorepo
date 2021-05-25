import React from 'react';
import { render, screen } from '@testing-library/react';
import InternalServerError from './InternalServerError';

describe('InternalServerError', () => {
  test('it should render', () => {
    render(<InternalServerError />);

    expect(screen.queryByRole('heading')).toHaveTextContent('Oops!');
    expect(screen.queryByTestId('message')).toHaveTextContent(
      'Something went wrong. Please try again later.'
    );
  });
});
