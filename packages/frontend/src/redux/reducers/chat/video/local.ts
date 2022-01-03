import { createSlice } from '@reduxjs/toolkit';

export interface LocalVideoState {
  camera: {
    isOn: boolean;
  },
  mic: {
    isOn: boolean
  }
}

const initialState: LocalVideoState = {
  camera: {
    isOn: true,
  },
  mic: {
    isOn: true,
  },
};

const {
  actions: {
    setCamera,
    setMic,
    toggleCamera,
    toggleMic,
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
  },
});

export default reducer;

export {
  setCamera,
  setMic,
  toggleCamera,
  toggleMic,
};
