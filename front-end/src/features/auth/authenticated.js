import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  role: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      const { isAuthenticated, role, userId } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.role = role;
      state.userId = userId;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
      state.userId = null;
    },
  },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
