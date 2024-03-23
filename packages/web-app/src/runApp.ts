import express from 'express';
import { AppStartupOptions } from './types';

function isPromise(value?: any) {
  return Boolean(value && typeof value.then === 'function');
}

export default async function runApp(
  app: express.Application,
  options: AppStartupOptions = {
    port: 3000,
    setup: undefined,
    callback: undefined,
  }
) {
  const { port, appName, setup, callback } = options;

  const startApp = () => {
    app.listen(port, () => {
      console.log(`${appName || 'App'} started on port ${port}`);
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  if (setup && typeof setup === 'function') {
    if (isPromise(setup)) {
      setup()?.then(() => {
        startApp();
      });
      return;
    }
  }
  startApp();
}
