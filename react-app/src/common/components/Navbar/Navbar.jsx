import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import StyleVariables from '../../styles/variables';

const AppLogoAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AppLogo = styled.img`
  animation: 20s ${AppLogoAnimation} infinite linear;
  height: 36px;
  pointer-events: none;
`;

const DarkModeTrigger = styled.span`
  cursor: pointer;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 1em;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  margin-bottom: 1rem;
`;

export default function Navbar({
  hasSwitchedToDarkMode,
  onDarkModeTriggerClick,
}) {
  return (
    <Container>
      <h1>
        <AppLogo src="/images/logo.svg" />
        Node React Monorepo
      </h1>
      <DarkModeTrigger
        style={{
          color: hasSwitchedToDarkMode
            ? StyleVariables.themes.dark.text
            : StyleVariables.themes.light.text,
        }}
      >
        <FontAwesomeIcon
          icon={hasSwitchedToDarkMode ? faSun : faMoon}
          size="2x"
          onClick={onDarkModeTriggerClick}
        />
      </DarkModeTrigger>
    </Container>
  );
}

Navbar.propTypes = {
  hasSwitchedToDarkMode: PropTypes.bool,
  onDarkModeTriggerClick: PropTypes.func,
};

Navbar.defaultProps = {
  hasSwitchedToDarkMode: false,
  onDarkModeTriggerClick: () => {},
};
