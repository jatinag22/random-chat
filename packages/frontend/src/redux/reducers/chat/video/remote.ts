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
    level: Number(localStorage.getItem('remoteVideo.volume.level')) || 100,
    isMute: localStorage.getItem('remoteVideo.volume.isMute') === 'true',
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

    toggleMute: (state) => {
      const newIsMute = !state.volume.isMute;

      localStorage.setItem('remoteVideo.volume.isMute', newIsMute.toString());

      return ({
        ...state,
        volume: {
          ...state.volume,
          isMute: newIsMute,
        },
      });
    },

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
