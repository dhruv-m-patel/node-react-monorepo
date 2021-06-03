import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound', () => {
  test('it should render', () => {
    render(<NotFound />);
    expect(screen.queryByRole('heading')).toHaveTextContent('Page not found');
    expect(screen.queryByTestId('message')).toHaveTextContent(
      'The page you are looking for has been moved or does not exist.'
    );
  });
});
