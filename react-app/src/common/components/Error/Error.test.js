import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Error', () => {
  test('it should render', () => {
    render(
      <Error message="Oops! Gotta pay the internet bill to continue..." />
    );

    expect(
      screen.getByText(/(Oops! Gotta pay the internet bill to continue...)/i)
    ).toBeInTheDocument();
  });
});
