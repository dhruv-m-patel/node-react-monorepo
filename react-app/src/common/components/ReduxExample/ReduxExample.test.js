import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReduxExample from './ReduxExample';

describe('ReduxExample', () => {
  test('it should render loader when fetching data', () => {
    render(
      <MemoryRouter>
        <ReduxExample isFetching fetchTestData={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('it should render data', () => {
    render(
      <MemoryRouter>
        <ReduxExample
          data={['John Doe', 'Jane Doe', 'Foo Bar', 'Bar Baz', 'Foo Baz']}
        />
      </MemoryRouter>
    );
    expect(screen.queryByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(5);
  });

  test('it should render error', () => {
    render(
      <MemoryRouter>
        <ReduxExample error="There was an error, please try later." />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/(There was an error, please try later.)/i)
    ).toBeInTheDocument();
  });
});
