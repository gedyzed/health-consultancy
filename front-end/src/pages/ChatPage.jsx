import Chat from "./ChatD.jsx";
import ChatApp from "./ChatApp.jsx";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const doctors = [
  { id: "gedion", token: "007eJxTYAhLvntMZeqrvefYd6sdPK+39Yy0VqloiYItW4K7wUkfBwYFBuNUAzNDS0NTQ4tUUxOTFPMkY2NDYzPDFNM0cxNDEyNzu68qGQ2BjAwhS5xZGBlYGRiBEMRXYUg0MzE1Mkg10DVKMk/RNTRMM9C1TE5K1jUxN01NsjRJTE0yMAQAN+0jwQ==" },
  { id: "abebe", token: "007eJxTYBA78X/C+qn7vvA6/T/06ZXWHzvlptg18gfO7vl38WF3rsopBQbjVAMzQ0tDU0OLVFMTkxTzJGNjQ2MzwxTTNHMTQxMjc7+vKhkNgYwMzRN4mRgZWBkYgRDEV2EwSrI0SrOwMNA1SjNM0jU0TDPQTUpLNdE1MzewMDMzTEuzSLMEAKSlKVI=" },
  { id: "alazar", token: "007eJxTYFg/b8s9hdC34rnPt7D2u11X3h+Xw9bBYl5VlCHzfOsiAzEFBuNUAzNDS0NTQ4tUUxOTFPMkY2NDYzPDFNM0cxNDEyNz7a8qGQ2BjAwx6VeYGBlYGRiBEMRXYUi2sEg0SjI10DVKMk/RNTRMM9BNNE1N1E1MMUhJNLdMMjdOtgAArJElZA==" }
];

import {
  setUserId,
  setIsLoggedIn,
  setChatClient,
} from "../features/chat/chatSlice"

const ChatPage = () => {

  const params = useParams();
  const userId = params.id;
  const chatClient = useRef(null);
  const dispatch = useDispatch();
  
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
      console.log("Please enter userId and token");
    }
  };

  useEffect(() => {

    const targetDoctor = doctors.find((doctor) => doctor.id === userId);

    if (targetDoctor) {
      handleLogin(targetDoctor.id, targetDoctor.token);
    } else {
      console.warn('Doctor not found for ID:', userId);
    }
  }, [doctors, userId]);


  return (
    <>
      <ChatApp chatClient={chatClient} />
    </>
  );
};

export default ChatPage;
