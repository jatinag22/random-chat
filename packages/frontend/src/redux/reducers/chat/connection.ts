import { createSlice } from '@reduxjs/toolkit';
import { Request } from '../constants';
import type { RequestType } from '../types';

export interface ConnectionState {
  request: RequestType,
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
  request: null,
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
  }, reducer,
} = createSlice({
  name: 'chatConnection',
  initialState,
  reducers: {

    chatConnectionReqestStart: (state) => ({
      ...state,
      request: Request.LOADING,
    }),

    chatConnectionReqestSuccess: (state) => ({
      ...state,
      request: Request.SUCCESS,
    }),

    chatConnectionReqestError: (state) => ({
      ...state,
      request: Request.ERROR,
    }),

  },
});

export default reducer;

export {
  chatConnectionReqestStart,
  chatConnectionReqestSuccess,
  chatConnectionReqestError,
};
