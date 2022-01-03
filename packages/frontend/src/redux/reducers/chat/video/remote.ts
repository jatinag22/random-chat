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
    toggleMute,
    toggleVisibility,
  }, reducer,
} = createSlice({
  name: 'remoteVideoChat',
  initialState,
  reducers: {

    setVolume: (state, action) => ({
      ...state,
      volume: {
        ...state.volume,
        ...action.payload,
      },
    }),

    setVisibility: (state, action) => ({
      ...state,
      visibility: {
        ...state.visibility,
        ...action.payload,
      },
    }),

    toggleMute: (state) => ({
      ...state,
      volume: {
        ...state.volume,
        isMute: !state.volume.isMute,
      },
    }),

    toggleVisibility: (state) => ({
      ...state,
      visibility: {
        ...state.visibility,
        isVisible: !state.visibility.isVisible,
      },
    }),
  },
});

export default reducer;

export {
  setVolume,
  setVisibility,
  toggleMute,
  toggleVisibility,
};
