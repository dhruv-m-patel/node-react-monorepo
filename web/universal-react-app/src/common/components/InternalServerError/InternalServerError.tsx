import { Box, Typography } from '@material-ui/core';
import React from 'react';

export default function InternalServerError() {
  return (
    <Box>
      <Typography variant="h4">Oops!</Typography>
      <Typography data-testid="message">
        Something went wrong. Please try again later.
      </Typography>
    </Box>
  );
}
