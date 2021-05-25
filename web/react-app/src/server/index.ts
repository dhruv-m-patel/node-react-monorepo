import dotenv from 'dotenv';
import Server from './Server';

dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
global.Promise = require('bluebird').Promise;

const server = new Server();
server.start().then((port) => {
  // eslint-disable-next-line no-console
  console.log(`App has started on port ${port}`);
});
