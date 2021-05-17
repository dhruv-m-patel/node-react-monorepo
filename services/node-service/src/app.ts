import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import * as ExpressOpenApiValidator from 'express-openapi-validator';
import yaml from 'js-yaml';
import { sayHello } from './models/hello';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(cookieParser());

app.use(
  ExpressOpenApiValidator.middleware({
    apiSpec: yaml.load(
      fs.readFileSync(path.join(__dirname, './api/spec.yaml'), 'utf8')
    ) as string,
    validateRequests: true,
    validateResponses: true,
  })
);

app.get('/api/message', (req: Request, res: Response) => {
  res.json({ message: sayHello() });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is healthy!' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.error(err.message, err.stack);
    res.status(500).send('Internal server error');
  } else {
    try {
      next();
    } catch (error) {
      console.error(error.message, error.stack);
    }
  }
});

export default app;
