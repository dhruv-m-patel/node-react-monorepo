import { Typography } from '@material-ui/core';
import React from 'react';

export default function NotFound() {
  return (
    <React.Fragment>
      <Typography variant="h4">Page not found</Typography>
      <Typography data-testid="message">
        The page you are looking for has been moved or does not exist.
      </Typography>
    </React.Fragment>
  );
}
