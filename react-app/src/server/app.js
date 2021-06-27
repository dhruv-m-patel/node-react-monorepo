import path from 'path';
import express from 'express';
import confit from 'confit';
import handlers from 'shortstop-handlers';
import shortstopRegex from 'shortstop-regex';
import morgan from 'morgan';
import enrouten from 'express-enrouten';
import 'fetch-everywhere';
import { configureApp } from '@dhruv-m-patel/express-app';
import { readConfiguration, betterRequire } from '../lib/utils';
import renderPage from './middleware/renderPage';

global.Promise = require('bluebird').Promise;

const configurations = [];

function addDefaultConfiguration(rootDirectory) {
  const configFactory = confit({
    basedir: path.join(rootDirectory, 'config'),
    protocols: {
      root: handlers.path(rootDirectory),
      path: handlers.path(
        ['development', 'test'].includes(process.env.NODE_ENV)
          ? path.join(rootDirectory, 'src')
          : path.join(rootDirectory, 'build')
      ),
      require: betterRequire(rootDirectory),
      regex: shortstopRegex(),
      env: handlers.env(),
    },
  });
  configurations.push(configFactory);
}

async function addConfigurationOverrides() {
  let lastConfig;
  for (const config of configurations.reverse()) {
    if (lastConfig) {
      config.addOverride(lastConfig._store);
    }
    lastConfig = await readConfiguration(config);
  }
  return lastConfig;
}

export default configureApp({
  appName: 'React App',
  setup: (app) => {
    // Hydrate configuration
    addDefaultConfiguration(process.cwd());
    addConfigurationOverrides()
      .then((config) => {
        // Configure all requests to contain configuration
        app.use((req, res, next) => {
          req.config = config;
          next();
        });

        if (config.get('trustProxy')) {
          app.enable('trust proxy');
        }
      })
      .catch((err) => {
        console.log(`Error hydrating configuration: ${err.message}`, err.stack);
      });

    // disable X-Powered-By header
    app.disable('x-powered-by');

    // Configure general middlewares
    app.use(morgan('combined'));
    app.use(express.static(path.resolve(__dirname, '../../static')));
    app.use(express.static(path.resolve(__dirname, '../../build-static')));
    app.use(
      enrouten({
        directory: path.resolve(__dirname, './routes'),
      })
    );

    app.get('*', renderPage);

    if (process.env.NODE_ENV === 'development') {
      const webpack = require('webpack');
      const compiler = webpack(require('../../webpack.config.js'));
      app.use(
        require('webpack-dev-middleware')(compiler, {
          stats: { colors: true },
        })
      );
      app.use(require('webpack-hot-middleware')(compiler));
    }
  },
});
