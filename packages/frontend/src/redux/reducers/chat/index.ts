import chatConnectionReducer from './connection';
import videoChatReducers from './video';

const chatReducers = {
  chatConnection: chatConnectionReducer,
  ...videoChatReducers,
};

export default chatReducers;

export * from './connection';
export * from './video';
