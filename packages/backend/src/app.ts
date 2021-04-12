import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { sayHello } from './models/hello';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(cookieParser());

app.disable('x-powered-by');

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>${sayHello()}</h1>`);
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Server is healthy!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.error(err.message, err.stack);
    res.status(500).send('Internal server error');
  } else {
    next();
  }
});

export default app;
