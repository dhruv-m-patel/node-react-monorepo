import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  centered: {
    textAlign: 'center',
  },
}));

interface LoaderComponentProps {
  color?: 'primary' | 'secondary';
  size?: number;
  thickness?: number;
  message?: string;
  value?: number;
  variant?: 'determinate' | 'indeterminate' | 'static';
  children?: React.ReactNode;
  className?: string;
}

export default function Loader({
  message,
  color = 'primary',
  children,
  className,
  size = 30,
  thickness = 3,
  variant = 'indeterminate',
  ...props
}: LoaderComponentProps) {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.centered, className)} {...props}>
      <CircularProgress
        color={color}
        size={size}
        thickness={thickness}
        variant={variant}
      />
      {!!message && (
        <React.Fragment>
          <br />
          <Typography variant="body2">{message}</Typography>
        </React.Fragment>
      )}
      {children}
    </Box>
  );
}
