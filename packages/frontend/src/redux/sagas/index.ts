import { all, fork } from 'redux-saga/effects';
import chatWatchers from './chat';

export default function* rootSaga() {
  yield all([
    ...chatWatchers.map((watcherSaga) => fork(watcherSaga)),
  ]);
}
