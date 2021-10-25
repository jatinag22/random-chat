import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  isMenuDrawerOpen: boolean,
  theme: 'light' | 'dark',
}

const initialState: AppState = {
  isMenuDrawerOpen: false,
  theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
};

const {
  actions: {
    toggleMenuDrawer,
    toggleTheme,
  }, reducer,
} = createSlice({
  name: 'app',
  initialState,
  reducers: {

    toggleMenuDrawer: (state, action) => ({
      ...state,
      isMenuDrawerOpen: action.payload.open ?? !state.isMenuDrawerOpen,
    }),

    toggleTheme: (state, action) => {
      const newTheme = action.payload.mode ?? state.theme === 'light' ? 'dark' : 'light';

      localStorage.setItem('theme', newTheme);

      return {
        ...state,
        theme: newTheme,
      };
    },

  },
});

export default reducer;

export {
  toggleMenuDrawer,
  toggleTheme,
};