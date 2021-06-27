import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound', () => {
  test('it should render', () => {
    render(<NotFound />);
    expect(screen.getAllByRole('heading')[0]).toHaveTextContent(
      'Page not found'
    );
    expect(screen.getAllByRole('heading')[1]).toHaveTextContent(
      'The page you are looking for has been moved or does not exist.'
    );
  });
});
