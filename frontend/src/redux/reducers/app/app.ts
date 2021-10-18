import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenuDrawerOpen: false,
};

const {
  actions: {
    toggleMenuDrawer,
  }, reducer,
} = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMenuDrawer: (state, action) => ({
      ...state,
      isMenuDrawerOpen: action?.payload?.open !== undefined ? action.payload.open : !state.isMenuDrawerOpen,
    }),
  },
});

export default reducer;

export {
  toggleMenuDrawer,
};
