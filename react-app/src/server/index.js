import dotenv from 'dotenv';
import { runApp } from '@dhruv-m-patel/express-app';
import app from './app';

dotenv.config();

const port = process.env.REACT_APP_PORT || 3000;
runApp(app, port);
