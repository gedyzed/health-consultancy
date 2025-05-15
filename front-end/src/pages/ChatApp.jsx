import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import AgoraChat from "agora-chat";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addChatMessage } from "../features/chat/chatMessageSlice";
import { saveMessage } from "../features/chat/chatSliceApi";
import VideoConfig from "./videos/VideoConfig"


import {
    setUserId,
    setPeerId,
    setMessage,
    addLog,
    setIsLoggedIn,
    setCurrentChat,
    setToken,
} from "../features/chat/chatSlice"




const doctors = [
    { id: 'abebe', name: "abebe", specialty: "Pediatrics" },
    { id: "daniel", name: "gedion", specialty: "Pediatrics" },
    { id: "alazar", name: "alazar", specialty: "Pediatrics" },
];

const ChatApp = ({ chatClient }) => {

    const appKey = import.meta.env.VITE_APP_KEY;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //user chat states 
    const messages = useSelector(state => state.messages.messages)
    const userId = useSelector(state => state.chatState.userId);
    const peerId = useSelector(state => state.chatState.peerId)
    const message = useSelector(state => state.chatState.message )
    const currentChat = useSelector(state => state.chatState.currentChat)
    const logs = useSelector(state => state.chatState.logs);
    const IsLoggedIn = useSelector(state => state.chatState.IsLoggedIn);
    const [startCall, setStartCall] = useState(false);


 
    const handleSendMessage = async () => {
        if (message.trim()) {
            try {
                const options = {
                    chatType: "singleChat", // Sets the chat type as a one-to-one chat.
                    type: "txt", // Sets the message type.
                    to: peerId, // Sets the recipient of the message with user ID.
                    msg: message, // Sets the message content.
                };
                let msg = AgoraChat.message.create(options);

                await chatClient.current.send(msg);
                addMessage(userId, message, peerId, "outgoing");
                dispatch(addLog(message, userId));
                dispatch(setMessage(""));
            } catch (error) {
                addLog(`Message send failed: ${error.message}`);
            }
        } else {
            addLog("Please enter message content");
        }
    };

    const addMessage = (user, msg, receiver, direction) => {

        const peerKey = user === userId ? receiver : user; 
        const timestamp = Date.now();
            dispatch(addChatMessage(
                {
                receiver: peerKey, 
                message: {user, msg, direction, timestamp}
            }
        ));

        //==========================save data ==========
        // messageData = {
        //     message_id: `msg_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
        //     receiver_id:receiver,
        //     sender_id:user,
        //     Date:now.toISOString().split('T')[0],
        //     Time:now.toTimeString.split(' ')[0],
        //     Message:msg,
        //     created_at:now.toISOString(),
        //     updated_at:now.toISOString(),
        // }    
        // dispatch(saveMessage(messageData))   
    };

    useEffect(() => {
        // Initializes the Web client.
        chatClient.current = new AgoraChat.connection({
            appKey: appKey,
        });

        // Adds the event handler.
        chatClient.current.addEventHandler("connection&message", {
            // Occurs when the app is connected to Agora Chat.
            onConnected: () => {
                dispatch(setIsLoggedIn(true));
                dispatch(addLog(`User ${userId} Connect success !`));
            },
            // Occurs when the app is disconnected from Agora Chat.
            onDisconnected: () => {
                dispatch(setIsLoggedIn(false));
                dispatch(addLog(`User Logout!`));
            },
            // Occurs when a text message is received.
            onTextMessage: (message) => {
                dispatch(addLog(`${message.from}: ${message.msg}`));
                dispatch(addMessage(message.from, message.msg, userId, "incoming"));
            },
            // Occurs when the token is about to expire.
            onTokenWillExpire: () => {
                dispatch(addLog("Token is about to expire"));
            },
            // Occurs when the token has expired.
            onTokenExpired: () => {
                dispatch(addLog("Token has expired"));
            },
            onError: (error) => {
                dispatch(addLog(`on error: ${error.message}`));
            },
        });

    }, []);


    // Logs out.
    const handleLogout = () => {
        chatClient.current.close();
        dispatch(setIsLoggedIn(false));
        dispatch(setUserId(""));
        dispatch(setToken(""));
        dispatch(setPeerId(""));
    };

    const handleSelectChat = (doctor) => {
        dispatch(setCurrentChat(doctor));
        dispatch(setPeerId(doctor.id));
    };
  const handlevideocall = () => 
    {
        setStartCall(true);
         if (userId && peerId) {
        navigate(`/video/${userId}/${peerId}`);
  }
    }  

const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

    return (
        <div className="font-Lora bg-white min-h-screen">
            <div className="grid sm:grid-cols-12 mt-5 gap-4">
                {/* Sidebar with doctor list */}
                <div className="sm:col-span-4 bg-gray-50 rounded-lg p-4">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-[#023E8A] mb-2">Available Doctors</h2>
                        <div className="relative">
                            <input
                                type="text"
                                className="border-[#023E8A] border-2 h-10 w-full pl-10 rounded-lg"
                                placeholder="Search doctors..."
                            />
                            <img
                                src="./search-icon.svg"
                                className="absolute left-3 top-3 h-4 w-4"
                                alt="search"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 max-h-[500px] overflow-y-auto">
                        {doctors.filter((doctor) => doctor.id !== userId)
                            .map((doctor) =>
                                doctor.id !== userId ?
                                    (
                                        <button
                                            key={doctor.id}
                                            onClick={() => handleSelectChat(doctor)}
                                            className={`w-full p-3 rounded-lg text-left hover:bg-blue-50 transition-colors ${currentChat?.id === doctor.id ? 'bg-blue-100 border border-blue-300' : 'bg-white border border-gray-200'}`}
                                        >
                                            <div className="font-medium text-gray-900">{doctor.name}</div>
                                            <div className="text-sm text-gray-500">{doctor.specialty}</div>
                                        </button>
                                    ) : null)}
                    </div>
                </div>

                {/* Main chat area */}
                <div className="sm:col-span-8 bg-white rounded-lg border border-gray-200 flex flex-col h-screen">
                    {currentChat ? (
                        <>
                            {/* Chat header */}
                            <div className="border-b border-gray-200 p-4 flex justify-between items-center bg-blue-50 rounded-t-lg">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#023E8A]">{currentChat.name}</h3>
                                    <p className="text-sm text-gray-600">{currentChat.specialty}</p>
                                </div>
                                <button className="p-2 rounded-full hover:bg-blue-100">
                                    <FontAwesomeIcon
                                        icon={faVideo}
                                        onClick={handlevideocall}
                                        className="text-[#023E8A] h-5 w-5"
                                    />
                                </button>
                            </div>

                            {/* Messages area */}
                            <div className="flex-1 p-4 overflow-y-auto h-full">
                                <div className="space-y-3">
                                    {(messages[currentChat?.id] || []).length === 0 ? (
                                        <div className="text-center text-gray-500 py-10">
                                            No messages yet. Start the conversation!
                                        </div>
                                    ) : (
                                        messages[currentChat?.id] || []).map((msg, index) => (
                                            
                                            <div
                                                key={index}
                                                className={`flex ${msg.direction === "outgoing" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-[75%] p-3 rounded-lg ${msg.direction === "outgoing"
                                                            ? "bg-[#053f8a] text-white rounded-br-none"
                                                            : "bg-[#DCF8C6] text-gray-900 rounded-bl-none"
                                                        }`}
                                                >
                                                    <div className="text-xs font-medium mb-1">
                                                        {console.log(msg)}
                                                        {msg.user === userId ? "You" : currentChat.name}
                                                    </div>
                                                    <div>{msg.msg}</div>
                                                    <div className="text-xs mt-1 text-right opacity-80">
                                                        {msg.timestamp}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Message input */}
                            <div className="border-t border-gray-200 p-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Type a message..."
                                        value={message}
                                        onChange={(e) => dispatch(setMessage(e.target.value))}
                                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!message.trim()}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#023E8A] disabled:opacity-50"
                                    >
                                        <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center text-gray-500 h-screen">
                            <div className="text-center p-6">
                                <h3 className="text-xl font-medium mb-2">No chat selected</h3>
                                <p>Select a doctor from the list to start chatting</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatApp


