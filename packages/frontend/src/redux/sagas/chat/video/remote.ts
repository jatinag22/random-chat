import { takeEvery } from 'redux-saga/effects';
import { remoteVideoReuestStart } from '../../../reducers/actions';

function* remoteVideoWorker() {
  yield null;
}

export default function* remoteVideoWatcher() {
  yield takeEvery(remoteVideoReuestStart.type, remoteVideoWorker);
}
