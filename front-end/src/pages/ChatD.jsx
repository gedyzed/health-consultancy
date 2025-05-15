import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import AgoraChat from "agora-chat";
import { useParams } from "react-router-dom";

const doctors = [
  { id: 'abebe', name:"abebe", specialty: "Pediatrics"  },
  { id: "daniel", name: "gedion", specialty: "Pediatrics" },
  { id: "alazar", name: "alazar", specialty: "Pediatrics" },
];

const Chat = () => {
  const params = useParams();
  const currentUserId = params.id || "alazar"
  const appKey = "";
  
  const chatClient = useRef(null);
  const [doctorsList, setDoctorsList] = useState(doctors);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [logs, setLogs] = useState([]);

  // Add log message
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `${timestamp}: ${message}`]);
    console.log(message);
  };

  // Register user on backend
  const registerUser = async (username) => {
    try {
      const res = await fetch("http://localhost:8000/api/create/agora/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      addLog(`User ${username} registered successfully`);
    } catch (err) {
      addLog(`Registration error: ${err.message}`);
    }
  };

  // Get user token from backend
  const getUserToken = async (username) => {
    try {
      const res = await fetch("http://localhost:8000/api/agora/token/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (res.ok) {
        addLog(`Token received for ${username}`);
        return data.token;
      }
      throw new Error(data.message || "Failed to get token");
    } catch (err) {
      addLog(`Token error: ${err.message}`);
      return null;
    }
  };

  // Login to Agora Chat
  const login = async () => {
    if (!currentUserId) return;
    
    try {
      // First register the user if not already registered
      await registerUser(currentUserId);
      
      // Get token for the user
      const token = await getUserToken(currentUserId);
      if (!token) {
        throw new Error("Failed to get token");
      }
      
      // Initialize connection if not already connected
      if (!chatClient.current.isConnected) {
        await chatClient.current.open({
          user: currentUserId,
          agoraToken: token
        });
        addLog(`Logged in as ${currentUserId}`);
        setConnectionStatus("connected");
      }
    } catch (error) {
      addLog(`Login error: ${error.message}`);
      
      // Handle multi-device login case
      if (error.type === 206) {
        addLog("User is already logged in on another device. Forcing logout...");
        try {
          // Close any existing connection first
          await chatClient.current.close();
          // Then try to login again
          await login();
        } catch (err) {
          addLog(`Force login error: ${err.message}`);
        }
      }
    }
  };

  // Logout from Agora Chat
  const handleLogout = async () => {
    if (chatClient.current && chatClient.current.isConnected) {
      try {
        await chatClient.current.close();
        addLog("Logged out successfully");
        setConnectionStatus("disconnected");
      } catch (error) {
        addLog(`Logout error: ${error.message}`);
      }
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentChat) return;

    try {
      const options = {
        chatType: "singleChat", // For one-to-one chat
        type: "txt", // Text message
        to: currentChat.id, // Recipient ID
        msg: newMessage // Message content
      };

      // Create message instance
      const msg = AgoraChat.message.create(options);
      
      // Send the message
      await chatClient.current.send(msg);
      
      // Add the message to local state
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: currentUserId,
        receiver: currentChat.id,
        content: newMessage,
        timestamp: new Date().toISOString(),
        isLocal: true
      }]);
      
      setNewMessage("");
      addLog(`Message sent to ${currentChat.name}`);
    } catch (err) {
      addLog(`Send message error: ${err.message}`);
    }
  };

  // Handle incoming messages
  const handleIncomingMessage = (msg) => {
    // Only process text messages for the current chat
    if (msg.type === "txt" && (!currentChat || msg.from === currentChat.id)) {
      setMessages(prev => [...prev, {
        id: msg.id || Date.now().toString(),
        sender: msg.from,
        receiver: currentUserId,
        content: msg.msg,
        timestamp: msg.time || new Date().toISOString(),
        isLocal: false
      }]);
      addLog(`Message received from ${msg.from}`);
    }
  };

  // Initialize Agora Chat
  useEffect(() => {
    // Initialize the chat client
    chatClient.current = new AgoraChat.connection({ appKey });
    
    // Set up event handlers
    const eventHandlers = {
      onConnected: () => {
        addLog(`Connected to chat service`);
        setConnectionStatus("connected");
      },
      onDisconnected: () => {
        addLog("Disconnected from chat service");
        setConnectionStatus("disconnected");
      },
      onTextMessage: handleIncomingMessage,
      onMultiDeviceEvent: (event) => {
        switch (event.operation) {
          case "contactRemove":
            addLog(`Contact removed on another device: ${event.target}`);
            break;
          case "contactAccept":
            addLog(`Contact request accepted on another device: ${event.target}`);
            break;
          case "contactDecline":
            addLog(`Contact request declined on another device: ${event.target}`);
            break;
          default:
            addLog(`Multi-device event: ${event.operation}`);
        }
      },
      onTokenWillExpire: () => {
        addLog("Token will expire soon");
        // You might want to refresh the token here
      },
      onTokenExpired: () => {
        addLog("Token expired. Attempting to reconnect...");
        login(); // Try to login again
      },
      onError: (error) => {
        addLog(`Error: ${error.message} (Type: ${error.type})`);
      }
    };

    // Add event listeners
    chatClient.current.addEventHandler("chatEvents", eventHandlers);

    // Login when component mounts
    login();

    // Cleanup on component unmount
    return () => {
      if (chatClient.current) {
        chatClient.current.removeEventHandler("chatEvents");
        handleLogout();
      }
    };
  }, []);

  // Format message time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle chat selection
  const handleSelectChat = (doctor) => {
    setCurrentChat(doctor);
    addLog(`Started chat with ${doctor.name}`);
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
            {doctorsList.map((doctor) => (
              <button
                key={doctor.id}
                onClick={() => handleSelectChat(doctor)}
                className={`w-full p-3 rounded-lg text-left hover:bg-blue-50 transition-colors ${currentChat?.id === doctor.id ? 'bg-blue-100 border border-blue-300' : 'bg-white border border-gray-200'}`}
              >
                <div className="font-medium text-gray-900">{doctor.name}</div>
                <div className="text-sm text-gray-500">{doctor.specialty}</div>
              </button>
            ))}
          </div>

          {/* Connection status */}
          <div className="mt-4 p-2 text-sm rounded-lg bg-gray-100">
            <span className="font-medium">Status:</span>{" "}
            <span className={connectionStatus === "connected" ? "text-green-600" : "text-red-600"}>
              {connectionStatus === "connected" ? "Connected" : "Disconnected"}
            </span>
            {connectionStatus === "connected" && (
              <button 
                onClick={handleLogout}
                className="ml-2 text-xs text-red-600 hover:underline"
              >
                (Logout)
              </button>
            )}
          </div>
        </div>

        {/* Main chat area */}
        <div className="sm:col-span-8 bg-white rounded-lg border border-gray-200 flex flex-col">
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
                    className="text-[#023E8A] h-5 w-5"
                  />
                </button>
              </div>

              {/* Messages area */}
              <div className="flex-1 p-4 overflow-y-auto max-h-[60vh]">
                <div className="space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === currentUserId ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] p-3 rounded-lg ${msg.sender === currentUserId
                              ? "bg-[#023E8A] text-white rounded-br-none"
                              : "bg-gray-200 text-gray-900 rounded-bl-none"
                            }`}
                        >
                          <div className="text-xs font-medium mb-1">
                            {msg.sender === currentUserId ? "You" : currentChat.name}
                          </div>
                          <div>{msg.content}</div>
                          <div className="text-xs mt-1 text-right opacity-80">
                            {formatTime(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Message input */}
              <div className="border-t border-gray-200 p-4">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#023E8A] disabled:opacity-50"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center p-6">
                <h3 className="text-xl font-medium mb-2">No chat selected</h3>
                <p>Select a doctor from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;