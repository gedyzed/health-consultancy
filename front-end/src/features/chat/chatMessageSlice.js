import { createSlice } from '@reduxjs/toolkit';

const chatMessageSlice = createSlice({
    name:"messages",
    initialState: {
        messages: {}
    },
    reducers:{
        addChatMessage:(state, action) => {
            const {receiver, message} = action.payload
            if (!state.messages[receiver]){
                state.messages[receiver] = [];
            }

            state.messages[receiver].push(message)
        }
    }
});

export const { addChatMessage } = chatMessageSlice.actions;
export default chatMessageSlice.reducer;
