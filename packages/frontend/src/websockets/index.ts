import { io, Socket } from 'socket.io-client';

const { REACT_APP_SERVER_URL } = process.env;

const SocketIo = class {
  private static socket: Socket;

  static initialize = () => {
    SocketIo.socket = io(REACT_APP_SERVER_URL as string, {
      transports: ['websocket', 'polling'],
    });

    SocketIo.socket.on('test-event', (message: string) => {
      // eslint-disable-next-line no-console
      console.log(`Listening socket: ${SocketIo.socket.id} event: test-event message: ${message}`);
    });
  };

  static emit(event: string, data: any) {
    SocketIo.socket.emit(event, data);
  }

  static sendTestMessage(message: string) {
    SocketIo.emit('test-event', message || 'test-data');
  }
};

export default SocketIo;
