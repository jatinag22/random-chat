import { createSlice } from '@reduxjs/toolkit';

export interface LocalVideoState {
  camera: {
    isOn: boolean,
  },
  mic: {
    isOn: boolean,
  },
  media: {
    stream: MediaStream | null,
  }
}

const initialState: LocalVideoState = {
  camera: {
    isOn: true,
  },
  mic: {
    isOn: true,
  },
  media: {
    stream: null,
  },
};

const {
  actions: {
    setCamera,
    setMic,
    toggleCamera,
    toggleMic,
    setLocalMedia,
  }, reducer,
} = createSlice({
  name: 'localVideoChat',
  initialState,
  reducers: {

    setCamera: (state, action) => ({
      ...state,
      camera: {
        ...state.camera,
        ...action.payload,
      },
    }),

    setMic: (state, action) => ({
      ...state,
      mic: {
        ...state.mic,
        ...action.payload,
      },
    }),

    toggleCamera: (state) => ({
      ...state,
      camera: {
        ...state.camera,
        isOn: !state.camera.isOn,
      },
    }),

    toggleMic: (state) => ({
      ...state,
      mic: {
        ...state.mic,
        isOn: !state.mic.isOn,
      },
    }),

    setLocalMedia: (state, action) => ({
      ...state,
      media: {
        ...state.media,
        ...action.payload,
      },
    }),

  },
});

export default reducer;

export {
  setCamera,
  setMic,
  toggleCamera,
  toggleMic,
  setLocalMedia,
};
