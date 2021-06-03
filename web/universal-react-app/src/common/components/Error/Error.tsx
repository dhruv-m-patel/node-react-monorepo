import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.main,
  },
}));

interface ErrorComponentProps {
  message: string;
}

export default function Error({ message }: ErrorComponentProps) {
  const classes = useStyles();
  return <Typography className={classes.error}>{message}</Typography>;
}
