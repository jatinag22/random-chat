import { combineReducers } from '@reduxjs/toolkit';
import appReducers from './app';

const rootReducer = combineReducers({
  ...appReducers,
});

export default rootReducer;
