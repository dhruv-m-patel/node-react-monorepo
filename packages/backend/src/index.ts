import cluster from 'cluster';
import os from 'os';
import app from './app';

const runApp = (): void => {
  if (cluster.isMaster) {
    console.log(`Main worker process id: ${process.pid}`);
    const cpus = os.cpus();
    console.log(
      `Forking ${cpus.length} child processes on CPU Model ${cpus[0].model}`
    );
    for (let i = 0; i < cpus.length; i++) {
      cluster.fork();
    }
  } else {
    const port = 5000;

    app.listen(port, () => {
      console.log(
        `Child process id ${process.pid} running, listening on port ${port}`
      );
    });
  }
};

runApp();

export default runApp;
export { app };
