import { io, Socket } from 'socket.io-client';

const { REACT_APP_SERVER_URL } = process.env;

const SocketIo = class {
  private static socket: Socket;

  static initialize = () => {
    SocketIo.socket = io(REACT_APP_SERVER_URL as string, {
      transports: ['websocket', 'polling'],
    });
  };
};

export default SocketIo;
