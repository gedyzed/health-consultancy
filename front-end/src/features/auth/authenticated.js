import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  role: null,
  userId: null,
  token: null,
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
    setToken(state, action){
      state.token = action.payload
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
