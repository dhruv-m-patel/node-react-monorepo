import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../Page';

export default function HomePage() {
  return (
    <Page>
      <h1>Welcome to React App!</h1>
      <br />
      <br />
      <Link to="/redux">View Example Page with Redux integration</Link>
    </Page>
  );
}
