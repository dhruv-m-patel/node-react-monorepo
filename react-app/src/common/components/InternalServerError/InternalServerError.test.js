import React from 'react';
import { render, screen } from '@testing-library/react';
import InternalServerError from './InternalServerError';

describe('InternalServerError', () => {
  test('it should render', () => {
    render(<InternalServerError />);

    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Oops!');
    expect(screen.getAllByRole('heading')[1]).toHaveTextContent(
      'Something went wrong. Please try again later.'
    );
  });
});
