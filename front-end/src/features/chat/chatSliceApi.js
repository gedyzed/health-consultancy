import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:8000/api';


export const insertMessage = createAsyncThunk(
  'app/insertMessage',
  async (messageData, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/message/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });

      if (!res.ok) throw new Error('Failed to save message');

      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'app/registerUser',
  async (username, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/create/agora/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      return { username };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getUserToken = createAsyncThunk(
  'app/getUserToken',
  async (username, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/agora/token/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to get token');

      return { username, token: data.token };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ========== SLICE ========== */

const appSlice = createSlice({
  name: 'app',
  initialState: {
    token:"",
    logs: [],
    messageStatus: 'idle',
    status: 'idle',
    error: null,
  },
  reducers: {
    addLog: (state, action) => {
      state.logs.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // insertMessage
      .addCase(insertMessage.pending, (state) => {
        state.messageStatus = 'loading';
      })
      .addCase(insertMessage.fulfilled, (state) => {
        state.messageStatus = 'succeeded';
        state.logs.push('Message saved successfully');
      })
      .addCase(insertMessage.rejected, (state, action) => {
        state.messageStatus = 'failed';
        state.error = action.payload;
        state.logs.push(`Message save error: ${action.payload}`);
      })

      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload.username);
        state.logs.push(`User ${action.payload.username} registered successfully`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.logs.push(`Registration error: ${action.payload}`);
      })

      // getUserToken
      .addCase(getUserToken.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tokens[action.payload.username] = action.payload.token;
        state.logs.push(`Token received for ${action.payload.username}`);
      })
      .addCase(getUserToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.logs.push(`Token error: ${action.payload}`);
      });
  },
});

export const { addLog, token } = appSlice.actions;
export default appSlice.reducer;
