import React, { MouseEvent } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { AcUnitRounded, BrightnessHigh, Brightness4 } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  appToolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h1': {
      fontSize: '2rem',
      fontWeight: '400',
    },
  },
  themeSwitcherButton: {
    color: theme.palette.common.white,
  },
}));

interface NavbarComponentProps {
  hasSwitchedToDarkMode: boolean;
  onDarkModeTriggerClick: (event: MouseEvent<HTMLElement>) => void;
}

export default function Navbar({
  hasSwitchedToDarkMode = false,
  onDarkModeTriggerClick,
}: NavbarComponentProps) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.appToolBar}>
        <Typography variant="h1">
          <AcUnitRounded />
          &nbsp; React App
        </Typography>
        <Button
          variant="text"
          className={classes.themeSwitcherButton}
          onClick={onDarkModeTriggerClick}
        >
          {hasSwitchedToDarkMode ? <BrightnessHigh /> : <Brightness4 />}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
