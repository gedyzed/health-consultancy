import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    userId: '',
    token: '',
    isLoggedIn: false,
    peerId: '',
    message: '',
    logs: [],
    chatClient: null, 
    currentChat: ""
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setPeerId: (state, action) => {
      state.peerId = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    addLog: (state, action) => {
      state.logs.push(action.payload);
    },
    clearLogs: (state) => {
      state.logs = [];
    },
    setChatClient: (state, action) => {
      state.chatClient = action.payload; 
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload
    },

  },
});

export const {
  setUserId,
  setToken,
  setIsLoggedIn,
  setPeerId,
  setMessage,
  addLog,
  clearLogs,
  setChatClient,
  setCurrentChat,
} = chatSlice.actions;

export default chatSlice.reducer;
