import React from 'react';
import styled from 'styled-components';
import Page from '../Page';

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardAnchorLink = styled.a`
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 3px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 45%;

  &:hover,
  &:focus,
  &:active {
    border-color: #0070f3;
  }

  & h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  & p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

const Description = styled.p`
  line-height: 1.5;
  font-size: 1.5rem;
  text-align: center;
`;

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 3rem;
`;

const TitleH1 = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;

  & a {
    text-decoration: none;
  }

  & a:hover,
  & a:focus,
  & a:active {
    text-decoration: underline;
  }
`;

const TitleH2 = styled.h2`
  margin: 0 0 1.5rem;
  line-height: 1.15;
  font-size: 2rem;
  text-align: center;
`;

export default function HomePage() {
  return (
    <Page>
      <Main>
        <TitleH1>
          Welcome to{' '}
          <a href="https://styledreactapp.herokuapp.com">Node React Monorepo</a>
        </TitleH1>
        <br />
        <br />
        <Description>
          Featured with reach support of modern tools to build your Node React
          projects
        </Description>

        <Grid>
          <CardAnchorLink href="https://www.npmjs.com/package/redux-api-middleware">
            <h2>Monorepo</h2>
            <p>
              Manage your frontend, backend and packages in one place with Lerna
            </p>
          </CardAnchorLink>

          <CardAnchorLink href="https://expressjs.com/">
            <h2>Express</h2>
            <p>Write microservices with node and express</p>
          </CardAnchorLink>

          <CardAnchorLink href="https://reactjs.org/">
            <h2>React</h2>
            <p>
              Write frontend applications using React (extended with SSR support
              built-in)
            </p>
          </CardAnchorLink>

          <CardAnchorLink href="https://reactrouter.com/web/guides/quick-start">
            <h2>React Router</h2>
            <p>
              Multi-page applications support with client-side routing using
              react-router-dom
            </p>
          </CardAnchorLink>

          <CardAnchorLink href="https://www.npmjs.com/package/confit">
            <h2>Configuration</h2>
            <p>
              Hydrate dynamic configuration relevant to different environments
            </p>
          </CardAnchorLink>

          <CardAnchorLink href="https://styled-components.com/">
            <h2>Styled Components</h2>
            <p>Style your React components with a breeze</p>
          </CardAnchorLink>

          <CardAnchorLink href="https://redux.js.org/">
            <h2>Redux</h2>
            <p>Manage your application state with Redux</p>
          </CardAnchorLink>

          <CardAnchorLink href="https://www.npmjs.com/package/redux-api-middleware">
            <h2>Redux API Middleware</h2>
            <p>Call server apis with ease using redux-api-middleware.</p>
          </CardAnchorLink>

          <CardAnchorLink href="https://storybook.js.org/docs/react/get-started/introduction">
            <h2>Storybook</h2>
            <p>Visualize your react components using Storybook</p>
          </CardAnchorLink>

          <CardAnchorLink href="https://enzymejs.github.io/enzyme/">
            <h2>Jest + Enzyme</h2>
            <p>Test your react components using Jest and Enzyme</p>
          </CardAnchorLink>
        </Grid>
        <br />
        <br />
        <TitleH2>Frontend References</TitleH2>
        <ul>
          <li>
            <a href="https://github.com/dhruv-m-patel/node-react-monorepo/blob/master/react-app/src/server/middleware/renderPage.js">
              React SSR Middleware
            </a>
          </li>
          <li>
            <a href="https://github.com/dhruv-m-patel/node-react-monorepo/blob/master/react-app/src/client/renderApp.js">
              Client App Entrypoint
            </a>
          </li>
          <li>
            <a href="https://github.com/dhruv-m-patel/node-react-monorepo/tree/master/react-app/src/client/redux">
              Redux Integration
            </a>
          </li>
          <li>
            <a href="https://github.com/dhruv-m-patel/node-react-monorepo/blob/master/react-app/src/client/redux/actions.js#L24">
              Example server api call with redux-api-middleware
            </a>
          </li>
          <li>
            <a href="https://github.com/dhruv-m-patel/node-react-monorepo/blob/master/react-app/src/common/components/ReduxExample/ReduxExample.jsx">
              Example component with Redux Integration
            </a>
          </li>
        </ul>
      </Main>
    </Page>
  );
}
