import { createGlobalStyle } from 'styled-components';
import StyleVariables from '../../styles/variables';

export const DarkTheme = createGlobalStyle`
  body {
    background-color: ${StyleVariables.themes.dark.pageBackgroundColor};
    color: ${StyleVariables.themes.dark.textColor};

    & a {
      color: ${StyleVariables.themes.dark.link};
    }

    & .text,
    & h1,
    & h2,
    & h3,
    & h4,
    & h5,
    & h6,
    & span,
    & strong,
    & div {
      color: ${StyleVariables.themes.dark.text};
    }

    & .table {
      color: ${StyleVariables.themes.dark.text};
    }

    & .navbar {
      box-shadow: 1px 1px 3px #333;
    }
  }
`;

export const LightTheme = createGlobalStyle`
  body {
    background-color: ${StyleVariables.themes.light.pageBackgroundColor};
    color: ${StyleVariables.themes.dark.textColor};
    & a {
      color: ${StyleVariables.themes.light.link};
    }

    & .text,
    & h1,
    & h2,
    & h3,
    & h4,
    & h5,
    & h6,
    & span,
    & strong,
    & div {
      color: ${StyleVariables.themes.light.text};
    }

    & .navbar {
      box-shadow: 1px 1px 3px #000;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  html {
    font-family: Helvetica, sans-serif;
    font-size: 14px;
    color: black;
    height: 100vh;
  }

  body: {
    margin:0;
    padding: 0;
  }

  a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
