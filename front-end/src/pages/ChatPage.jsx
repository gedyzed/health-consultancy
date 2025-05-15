import Chat from "./ChatD.jsx";
import ChatApp from "./ChatApp.jsx";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken, saveMessage, } from "../features/chat/chatSliceApi";
import { unwrapResult } from "@reduxjs/toolkit";



const doctors = [
  { id: "gedion",token: "007eJxTYHA+PYnl8wTplEkRU1IN+YxLymRFl5Y7yR2fI1xnxLXamkuBwTjVwMzQ0tDU0CLV1MQkxTzJ2NjQ2MwwxTTN3MTQxMic/75qRkMgI4OLy1UGRgZWIGZkAPHZGNJTUzLz8wDTuRqT" },
  { id: "abebe", token: "007eJxTYBA78X/C+qn7vvA6/T/06ZXWHzvlptg18gfO7vl38WF3rsopBQbjVAMzQ0tDU0OLVFMTkxTzJGNjQ2MzwxTTNHMTQxMjc7+vKhkNgYwMzRN4mRgZWBkYgRDEV2EwSrI0SrOwMNA1SjNM0jU0TDPQTUpLNdE1MzewMDMzTEuzSLMEAKSlKVI=" },
  { id: "alazar",token: "007eJxTYLjOcyJ98TaRX9Ey3EcFavb7nzhqetN+d9Ox2rRPRme2d+xSYDBONTAztDQ0NbRINTUxSTFPMjY2NDYzTDFNMzcxNDEyf3ZPNaMhkJGhT7CDmZGBlYERCEF8NobEnMSqxCIAgC4giw=="}
];

import {
  setUserId,
  setIsLoggedIn,
  setToken,
} from "../features/chat/chatSlice"

const ChatPage = () => {

  const params = useParams();
  const userId = params.id;
  const chatClient = useRef(null);
  const dispatch = useDispatch();
  const token = useSelector(state => state.chatState.token) 

  
  const handleLogin = (userId, token) => {

    if (userId && token) {
      chatClient.current.open({
        user: userId,
        accessToken: token,
      });

      dispatch(setUserId(userId))
      dispatch(setIsLoggedIn(true));
      console.log(userId, "logged successfull")

    } else {
      console.log(userId)
      console.log("Please enter userId and token");
    }
  };

  useEffect(() => {

    const init = async () => {
      const targetDoctor = doctors.find((doctor) => doctor.id === userId);
      // handleLogin(targetDoctor.id, targetDoctor.token)

      if (!targetDoctor){
        console.warn("Doctor not found for Id", userId)
        return; 
      }

      try{
        const resultAction = await dispatch(getUserToken(targetDoctor.id))
        const { token } = unwrapResult(resultAction);

        if(!token){
         alert("Token not returned from backend ")
          return; 


        }
        dispatch(setToken(token))
        handleLogin(targetDoctor.id, token);
  
      }
      catch(err) {
        // alert("Failed to fetch token or login:", err)
        console.log("Failed to fetch token or login:", err)
      } 
    }

     init();
    
  }, [doctors, userId]);
  return (
    <>
      <ChatApp chatClient={chatClient} />
    </>
  );
};

export default ChatPage;
