import { createSlice } from '@reduxjs/toolkit';

export interface RemoteVideoState {
  volume: {
    level: number,
    isMute: boolean,
    isHovering: boolean,
  },
  visibility: {
    isVisible: boolean
  }
}

const initialState: RemoteVideoState = {
  volume: {
    level: 100,
    isMute: false,
    isHovering: false,
  },
  visibility: {
    isVisible: true,
  },
};

const {
  actions: {
    setVolume,
    setVisibility,
  }, reducer,
} = createSlice({
  name: 'remoteVideo',
  initialState,
  reducers: {

    setVolume: (state, action) => ({
      ...state,
      volume: {
        ...state.volume,
        ...action.payload.volume,
      },
    }),

    setVisibility: (state, action) => ({
      ...state,
      visibility: {
        ...state.visibility,
        ...action.payload.visibility,
      },
    }),
  },
});

export default reducer;

export {
  setVolume,
  setVisibility,
};
