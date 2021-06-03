import React, { useState, useCallback, useEffect } from 'react';
import store from 'store';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from '../Navbar';
import PageContext from '../../context/PageContext';

const DEFAULT_HELMET_TITLE = 'React App';
const DEFAULT_HELMET_DESCRIPTION =
  'A universal react app with typescript, material-ui and redux support';

interface PageComponentProps {
  title?: string;
  description?: string;
  children?: any;
}

export default function Page({
  title = DEFAULT_HELMET_TITLE,
  description = DEFAULT_HELMET_DESCRIPTION,
  children,
}: PageComponentProps) {
  const [hasSwitchedToDarkMode, setHasSwitchedToDarkMode] = useState<boolean>(
    false
  );

  const switchToDarkMode = useCallback(() => {
    setHasSwitchedToDarkMode(!hasSwitchedToDarkMode);
    store.set('enableDarkMode', !hasSwitchedToDarkMode);
  }, [hasSwitchedToDarkMode]);

  // Set dark mode initially based on whether user prefers it using os preferences or previously turned it on
  useEffect(() => {
    if (hasSwitchedToDarkMode === undefined) {
      let shouldSetDarkModeInitially = false;
      const darkModeSetting = store.get('enableDarkMode');
      if (darkModeSetting === undefined && typeof window !== 'undefined') {
        shouldSetDarkModeInitially =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        shouldSetDarkModeInitially = darkModeSetting;
      }

      setHasSwitchedToDarkMode(shouldSetDarkModeInitially);
      store.set('enableDarkMode', shouldSetDarkModeInitially);
    }
  }, [hasSwitchedToDarkMode]);

  const currentThemeType = hasSwitchedToDarkMode ? 'dark' : 'light';
  const theme = createMuiTheme({
    palette: {
      type: currentThemeType,
    },
  });

  return (
    <PageContext.Provider value={{ theme: currentThemeType }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
          </Helmet>
          <Navbar
            onDarkModeTriggerClick={switchToDarkMode}
            hasSwitchedToDarkMode={hasSwitchedToDarkMode}
          />
          <br />
          {children}
        </HelmetProvider>
      </ThemeProvider>
    </PageContext.Provider>
  );
}
