import path from 'path';
import { Application, Request, Response } from 'express';
import { configureApp } from '@dhruv-m-patel/express-app';
import { sayHello } from './models/hello';

const app: Application = configureApp({
  appName: 'node-service',
  apiOptions: {
    apiSpec: path.join(__dirname, './api/spec.yaml'),
    specType: 'openapi',
  },
  setup: (app: Application) => {
    app.get('/api/message', (req: Request, res: Response) => {
      res.json({ message: sayHello() });
    });
  },
});

export default app;
