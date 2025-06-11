import ChatApp from "./ChatApp.jsx";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken, saveMessage, } from "../features/chat/chatSliceApi";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";


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
  
  const role = useSelector((state) => state.auth.role);
  const doctors = useSelector((state) => state.doctorChat.doctors);
  const patients = useSelector((state) => state.patientChat.patients);
  const [chats, setChats] = useState([])

  
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
  
      try{
        const resultAction = await dispatch(getUserToken(userId))
        const { token } = unwrapResult(resultAction);

        if(!token){
         alert("Token not returned from backend ")
          return; 


        }
        dispatch(setToken(token))
        handleLogin(userId, token);
  
      }
      catch(err) {
        alert("Failed to fetch token or login:", err)
        console.log("Failed to fetch token or login:", err)
      } 
    }

     init();
    
  }, [userId]);

      useEffect(() => {
      const users = doctors?.length > 0 ? doctors : patients;
  
      if (users && users.length > 0) {
          const chats = users.map((user) => {
          const [local, domain] = user.email.split('@');  
          const [service, dname] = domain.split(".")
          return {
              user_id: user.user_id,
              name: user.fullName,
              id: `${local}_${dname}`,
          };
          });
          setChats(chats)
      }
      }, [doctors, patients]);
  

  return (
    <>
      <ChatApp chatClient={chatClient} chats={chats}/>
    </>
  );
};

export default ChatPage;
