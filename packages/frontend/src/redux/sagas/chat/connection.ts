import { END, EventChannel, eventChannel } from 'redux-saga';
import {
  call, put, take, takeEvery,
} from 'redux-saga/effects';
import SocketIo from '../../../websockets';
import { chatConnectionReqestStart, chatConnectionReqestSuccess } from '../../reducers/actions';

const listener = (sentType: string) => eventChannel((emitter) => {
  SocketIo.listenOnce('new-connection', ({ socketId, type }) => {
    if (type === sentType) {
      emitter(socketId);
      emitter(END);
    }
  });
  // The subscriber must return an unsubscribe function
  return () => {};
});

function* chatConnectionWorker(action: any) {
  yield call(SocketIo.emit, 'new-connection', { type: action.payload.type });
  const chan: EventChannel<unknown> = yield call(listener, action.payload.type);
  try {
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      const socketId: string = yield take(chan);
      yield put(chatConnectionReqestSuccess({ socketId }));
    }
  } catch (error) {
    console.error(error); // TODO: handle error
  }
}

export default function* chatConnectionWatcher() {
  yield takeEvery(chatConnectionReqestStart.type, chatConnectionWorker);
}
