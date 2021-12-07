import { Server as ServerType } from 'http';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { instrument } from '@socket.io/admin-ui';
import logger from '../utils/logger';

const SocketIo = class {
  private readonly io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>;

  constructor(server: ServerType) {
    this.io = new Server(server, {
      cors: {
        origin: [process.env.CLIENT_URL as string, 'https://admin.socket.io'],
      },
    });

    logger.info('Socket.io initialized');

    instrument(this.io, {
      auth: false,
    });

    this.io.on('connection', (socket) => {
      logger.debug(`Socket instance connected: ${socket.id}`);

      socket.on('disconnect', (reason) => {
        logger.debug(`Socket instance disconnected: ${socket.id} ${reason}`);
      });

      socket.on('test-event', (message: string) => {
        logger.debug(`Listening socket: ${socket.id} event: test-event message: ${message}`);
        socket.emit('test-event', 'test-data');
      });
    });
  }
};

export default SocketIo;
