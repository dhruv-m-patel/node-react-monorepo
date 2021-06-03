import path from 'path';
import http from 'http';
import confit from 'confit';
// eslint-disable-next-line import/no-duplicates
import { Application, Request, Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-duplicates
import express from 'express';
import meddleware from 'meddleware';
import handlers from 'shortstop-handlers';
import shortstopRegex from 'shortstop-regex';
import 'fetch-everywhere';
import { readConfiguration, betterRequire } from '../lib/utils';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default class Server {
  app: Application;
  server: http.Server;
  config: any;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  configurations: Array<any> = [];

  async addConfigurationOverrides() {
    let lastConfig: any;
    for (const config of this.configurations.reverse()) {
      if (lastConfig) {
        config.addOverride(lastConfig._store);
      }
      lastConfig = await readConfiguration(config);
    }
    return lastConfig;
  }

  addDefaultConfiguration(rootDirectory: string) {
    const configFactory = confit({
      basedir: path.join(rootDirectory, 'config'),
      protocols: {
        root: handlers.path(rootDirectory),
        path: handlers.path(
          ['development', 'test'].includes(process.env.NODE_ENV || '')
            ? path.join(rootDirectory, 'src')
            : path.join(rootDirectory, 'build')
        ),
        require: betterRequire(rootDirectory),
        regex: shortstopRegex(),
        env: handlers.env(),
      },
    });
    this.configurations.push(configFactory);
  }

  async start() {
    this.addDefaultConfiguration(process.cwd());

    const config: any = await this.addConfigurationOverrides();

    this.config = config;

    // disable X-Powered-By header
    this.app.disable('x-powered-by');

    if (config.get('trustProxy')) {
      this.app.enable('trust proxy');
    }

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      // eslint-disable-next-line dot-notation
      (req as any).config = config;
      next();
    });

    // NOTE: configure using webpack-dev-middleware and webpack-hot-middleware earlier than other middlewares
    // for hot- reloading to work. Changing order may not guarantee live browser refresh.
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const webpack = require('webpack');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const compiler = webpack(require('../../webpack.config.js'));
      this.app.use(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('webpack-dev-middleware')(compiler, {
          stats: { colors: true },
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      this.app.use(require('webpack-hot-middleware')(compiler));
    }

    const middleware = config.get('meddleware');
    if (middleware) {
      this.app.use(meddleware(middleware));
    }

    return new Promise((resolve) => {
      const port = Number(
        ['staging', 'production'].includes(process.env.NODE_ENV || '')
          ? process.env.REACT_APP_PORT
          : config.get('port')
      );
      this.server.listen(port, () => {
        resolve(port);
      });
    });
  }

  stop(callback: any) {
    this.server.close(callback);
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */
