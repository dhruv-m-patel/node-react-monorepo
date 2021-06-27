import { runApp } from '@dhruv-m-patel/express-app';
import app from './app';

runApp(app, Number(process.env.NODE_SERVICE_PORT) || 5000, true);

export default runApp;
