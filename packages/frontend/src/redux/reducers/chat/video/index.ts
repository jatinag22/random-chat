import remoteVideoReducer from './remote';
import localVideoReducer from './local';

const videoChatReducers = {
  remoteVideoChat: remoteVideoReducer,
  localVideoChat: localVideoReducer,
};

export default videoChatReducers;

export * from './remote';
export * from './local';
