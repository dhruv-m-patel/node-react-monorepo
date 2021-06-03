import React from 'react';
import { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import configureStore from '../../client/redux/configureStore';
import Router from '../../common/router';
import ReduxStateDecorator from '../../client/redux/StateDecorator';

export default function () {
  return function renderPage(req: Request, res: Response) {
    const context: { url?: string } = {};
    if (context.url) {
      res.redirect(context.url);
      return;
    }

    // @ts-ignore
    const request = req as any;

    const store = configureStore(request.initialState || {});
    const preloadedState = request.initialState || store.getState();
    if (!request.initialState) {
      request.initialState = preloadedState;
    }

    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <ReduxStateDecorator initialState={preloadedState}>
          <Router />
        </ReduxStateDecorator>
      </StaticRouter>
    );

    const statsFile = path.join(
      process.cwd(),
      './build-static/loadable-stats.json'
    );
    const extractor = new ChunkExtractor({
      statsFile,
      entrypoints: ['client'],
      publicPath: '/',
    });

    res.send(`
      <!DOCTYPE html>
      <html lang="en-US">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" priority="1" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          <title>${request.config.get('title')}</title>
          ${extractor.getLinkTags()}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <script id="stateData">window.__PRELOADED_STATE__ = ${JSON.stringify(
            preloadedState
          ).replace(/</g, '\\u003c')};</script>
        </head>
        <body>
          <div id="root">${html}</div>
          ${extractor.getScriptTags()}
        </body>
      </html>
    `);
  };
}
