import { loadableReady } from '@loadable/component';
import renderApp from './renderApp';

function render() {
  renderApp();

  // @ts-ignore
  if (process.env.NODE_ENV === 'development' && module.hot) {
    // @ts-ignore
    module.hot.accept('./renderApp', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const renderApp = require('./renderApp').default;
      renderApp();
    });
  }
}

loadableReady(() => {
  render();
});
