import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuthenticated: false,
  sessionId: '',
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem('session_id');

      localStorage.setItem('accountId', action.payload.id);
    },
  },
});

export const { setUserData } = auth.actions;

export default auth.reducer;
