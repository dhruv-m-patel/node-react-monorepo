import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import enrouten from 'express-enrouten';
import morgan from 'morgan';
import session from 'express-session';
import cors from 'cors';
import { v4 as uuidV4 } from 'uuid';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import 'fetch-everywhere';
import { WebAppError, WebApplication, WebRequest } from './types';

function isPromise(value?: any) {
  return Boolean(value && typeof value.then === 'function');
}

function finalErrorHandler(
  err: WebAppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    if (!err.status) {
      console.error(err.message, err.stack);
    }
    res.status(err.status || 500).json({
      message: err.message,
    });
  } else {
    next();
  }
}

export interface AppOptions {
  paths: {
    routes: string;
    webpackConfig: string;
    staticDirectories?: Array<string>;
  };
  sessionSecret?: string;
  setup?: (app: WebApplication) => void | Promise<void>;
  useBabel?: Boolean;
}

export default async function configureApp(options: AppOptions): Promise<WebApplication> {
  const {
    setup,
    paths: { routes, staticDirectories, webpackConfig },
    sessionSecret,
    useBabel = false,
  } = options;

  // Add support for babel if requested by caller app
  if (useBabel) {
    // eslint-disable-next-line global-require
    require('@babel/register')({
      root: process.cwd(),
      ignore: [/node_modules/],
      only: [process.cwd()],
    });
  }

  const app: WebApplication = express();
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(compression());
  app.use(morgan('combined'));
  app.use(cors());

  // Enable distributed tracing through request identifiers
  app.use((req: WebRequest, res: Response, next: NextFunction) => {
    if (!req.id) {
      req.id = uuidV4();
      next();
    } else {
      next();
    }
  });

  // Enable sessions if session secret was provided by consumer
  if (sessionSecret) {
    app.use(
      session({
        secret: sessionSecret,
        saveUninitialized: true,
        resave: false,
        cookie: {
          httpOnly: true,
          maxAge: 60 * 60 * 10000, // Cookies will be valid for 1 hour
        },
      })
    );
  }

  if (staticDirectories?.length) {
    staticDirectories.forEach((path) => {
      app.use(express.static(path));
    });
  }

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const config = require(webpackConfig);
  const wpconfig = typeof config === 'function' ? config() : config;

  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(wpconfig);

    app.use(
      webpackDevMiddleware(compiler, {
        stats: { colors: true },
        publicPath: wpconfig.output.publicPath,
        serverSideRender: true,
      })
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    app.use(
      webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
        // @ts-ignore
        dynamicPublicPath: true,
        reload: true,
      })
    );
  } else {
    // If running in non-development mode, expose the public path as static
    app.use(express.static(wpconfig.output.path));
  }

  // Support directory-based routing by default
  app.use(
    enrouten({
      directory: routes,
    })
  );

  // Allow consumer to run its own setup adding additional things for server app
  if (setup && typeof setup === 'function') {
    if (isPromise(app)) {
      setup(app)?.then(() => {
        app.use(finalErrorHandler);
      });
      return app;
    }
    setup(app);
  }
  // Add final error handler for api endpoints
  app.use(finalErrorHandler);
  return app;
}
