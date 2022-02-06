import { createSlice } from '@reduxjs/toolkit';
import { Request } from '../constants';
import type { RequestType } from '../types';

export interface ConnectionState {
  request: {
    status: RequestType,
    message: string | null,
  },
  type: 'text' | 'audio' | 'video' | null,
  status: 'waiting' | 'not found' | 'connected' | null,
  remote: {
    socketId: string | null,
  },
  local: {
    socketId: string | null,
  }
}

const initialState: ConnectionState = {
  request: {
    status: null,
    message: null,
  },
  type: null,
  status: null,
  remote: {
    socketId: null,
  },
  local: {
    socketId: null,
  },
};

const {
  actions: {
    chatConnectionReqestStart,
    chatConnectionReqestSuccess,
    chatConnectionReqestError,
    setRemoteConnection,
  }, reducer,
} = createSlice({
  name: 'chatConnection',
  initialState,
  reducers: {

    chatConnectionReqestStart: (state, action) => ({
      ...state,
      request: { status: Request.LOADING, message: null },
      type: action.payload.type,
    }),

    chatConnectionReqestSuccess: (state, action) => ({
      ...state,
      request: { status: Request.SUCCESS, message: null },
      remote: {
        ...state.remote,
        socketId: action.payload.socketId,
      },
    }),

    chatConnectionReqestError: (state, action) => ({
      ...state,
      request: { status: Request.ERROR, message: action.payload.error },
    }),

    setRemoteConnection: (state, action) => ({
      ...state,
      remote: {
        ...state.remote,
        ...action.payload,
      },
    }),

  },
});

export default reducer;

export {
  chatConnectionReqestStart,
  chatConnectionReqestSuccess,
  chatConnectionReqestError,
  setRemoteConnection,
};
