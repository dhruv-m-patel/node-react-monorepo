import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import store from 'store';
import Container from 'react-bootstrap/Container';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from '../Navbar';
import PageContext from '../../context/PageContext';
import { GlobalStyle, DarkTheme, LightTheme } from './styles';

const DEFAULT_HELMET_TITLE = 'react-app';
const DEFAULT_HELMET_DESCRIPTION =
  'A universal react app with styled-components and redux support';

export default function Page({ title, description, children }) {
  const [hasSwitchedToDarkMode, setHasSwitchedToDarkMode] = useState(undefined);

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

  const Theme = hasSwitchedToDarkMode ? DarkTheme : LightTheme;
  const currentTheme = hasSwitchedToDarkMode ? 'dark' : 'light';

  return (
    <PageContext.Provider value={{ theme: currentTheme }}>
      <GlobalStyle />
      <Theme />
      <HelmetProvider>
        <Helmet>
          <title>{title || DEFAULT_HELMET_TITLE}</title>
          <meta
            name="description"
            content={description || DEFAULT_HELMET_DESCRIPTION}
          />
        </Helmet>
        <Navbar
          onDarkModeTriggerClick={switchToDarkMode}
          hasSwitchedToDarkMode={hasSwitchedToDarkMode}
        />
        <Container variant={currentTheme}>{children}</Container>
      </HelmetProvider>
    </PageContext.Provider>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
};

Page.defaultProps = {
  title: undefined,
  description: undefined,
  children: undefined,
};
