import app from './app';
import logger from '../utils/logger';
import SocketIo from '../websockets';

const { PORT, NODE_ENV, APP_NAME } = process.env;

const server = app.listen(PORT, (): void => {
  logger.info('Initializing Backend Server');
  logger.info(`Name: ${APP_NAME}`);
  logger.info(`Environment: ${NODE_ENV}`);
  logger.info(`Port: ${PORT}`);
  logger.info(`Process Id: ${process.pid}`);
});

const socketIoInstance = new SocketIo(server);

export { socketIoInstance };
export default server;
