import { takeEvery } from 'redux-saga/effects';
import { chatConnectionReqestStart } from '../../reducers/actions';

function* chatConnectionWorker() {
  yield null;
}

export default function* chatConnectionWatcher() {
  yield takeEvery(chatConnectionReqestStart.type, chatConnectionWorker);
}
