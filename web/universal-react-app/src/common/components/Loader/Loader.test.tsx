import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  test('it should render', () => {
    render(<Loader />);
    expect(screen.queryByRole('progressbar')).toBeInTheDocument();
  });

  test('it should render with message', () => {
    render(<Loader message="Loading!!!!!!!" />);
    expect(screen.getByText(/(Loading!!!!!!!)/i)).toBeInTheDocument();
  });

  test('it should render with children', () => {
    render(
      <Loader>
        <h4>Loading....</h4>
      </Loader>
    );
    expect(screen.queryByRole('heading')).toHaveTextContent('Loading....');
  });
});
