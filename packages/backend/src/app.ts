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

app.get('/api/message', (req: Request, res: Response) => {
  res.json({ message: sayHello() });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is healthy!' });
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
