import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authTokens: null,
  user: null,
  status: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthTokens(state, action) {
      state.authTokens = action.payload;
      state.status = true
    },
    setUser(state, action) {
      state.user = action.payload;
      state.status = true
    },
    clearAuth(state) {
      state.authTokens = null;
      state.user = null;
    },
  },
});

export const { setAuthTokens, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
