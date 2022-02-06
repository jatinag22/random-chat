import { Server as ServerType } from 'http';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { instrument } from '@socket.io/admin-ui';
import logger from '../utils/logger';

type AvailableUser = {
  socketId: string,
  type: string,
};

const availableUsers: AvailableUser[] = [];

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

      socket.on('test-event', (message: string, callback?: (...args: unknown[]) => void) => {
        logger.debug(`Listening socket: ${socket.id} event: test-event message: ${message}`);
        socket.emit('test-event', 'test-data');
        if (callback) {
          callback();
        }
      });

      socket.on('offer', ({ offer, socketId }) => {
        logger.debug(`sending offer from ${socket.id}`);
        this.io.to(socketId).emit('offer', { offer, socketId: socket.id });
      });

      socket.on('answer', ({ answer, socketId }) => {
        logger.debug(`sending answer from ${socket.id} to ${socketId}`);
        this.io.to(socketId).emit('answer', { answer, socketId: socket.id });
      });

      socket.on('new-ice-candidate', ({ candidate, socketId }) => {
        logger.debug(`sending candidate from ${socket.id} to ${socketId}`);
        this.io.to(socketId).emit('new-ice-candidate', { candidate, socketId: socket.id });
      });

      socket.on('new-connection', ({ type }) => {
        if (availableUsers.length === 0) {
          logger.debug(`adding in waiting list: ${socket.id}`);
          availableUsers.push({
            socketId: socket.id,
            type,
          });
        } else {
          const { socketId } = availableUsers.shift() as AvailableUser;
          logger.debug(`connecting ${socket.id} to ${socketId}`);
          this.io.to(socketId).emit('new-connection', { socketId: socket.id, type });
          this.io.to(socket.id).emit('new-connection', { socketId, type });
        }
      });
    });
  }
};

export default SocketIo;
