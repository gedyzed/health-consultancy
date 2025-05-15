import { createSlice } from '@reduxjs/toolkit';

const chatMessageSlice = createSlice({
    name:"messages",
    initialState: {
        messages: {}
    },
    reducers:{
        addChatMessage:(state, action) => {

            const {receiver, message} = action.payload
            console.log(receiver, message)
            if (!state.messages[receiver]){
                state.messages[receiver] = [];
            }

            state.messages[receiver].push(message)
   
        }
    }
});

export const { addChatMessage } = chatMessageSlice.actions;
export default chatMessageSlice.reducer;
