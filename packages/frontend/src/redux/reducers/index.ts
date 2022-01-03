import { combineReducers } from '@reduxjs/toolkit';
import appReducers from './app';
import chatReducers from './chat';

const rootReducer = combineReducers({
  ...appReducers,
  ...chatReducers,
});

export default rootReducer;
