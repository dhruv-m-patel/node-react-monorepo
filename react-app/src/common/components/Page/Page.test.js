import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from './Page';

describe('Page', () => {
  test('it should render', () => {
    render(
      <Page title="test page" description="test page">
        <h6>Test Page rendered</h6>
      </Page>
    );
    expect(screen.getAllByRole('heading')[1]).toHaveTextContent(
      'Test Page rendered'
    );
  });
});
