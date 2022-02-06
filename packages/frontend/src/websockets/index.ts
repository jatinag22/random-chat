import { io, Socket } from 'socket.io-client';

const { REACT_APP_SERVER_URL } = process.env;

const SocketIo = class {
  private static socket: Socket;

  static id: string;

  static initialize = () => {
    SocketIo.socket = io(REACT_APP_SERVER_URL as string, {
      transports: ['websocket', 'polling'],
    });

    SocketIo.socket.on('connect', () => {
      SocketIo.id = SocketIo.socket.id;
    });

    SocketIo.socket.on('test-event', (message: string) => {
      // eslint-disable-next-line no-console
      console.log(`Listening socket: ${SocketIo.socket.id} event: test-event message: ${message}`);
    });
  };

  static emit(event: string, data: any, callback?: (...args: any[]) => void) {
    SocketIo.socket.emit(event, data, callback);
  }

  static listen(event: string, callback: (...args: any[]) => void) {
    SocketIo.socket.on(event, callback);
  }

  static listenOnce(event: string, callback: (...args: any[]) => void) {
    SocketIo.socket.on(event, callback);
  }

  static sendTestMessage(message: string, callback?: (...args: any[]) => void) {
    SocketIo.emit('test-event', message || 'test-data', callback);
  }
};

export default SocketIo;
