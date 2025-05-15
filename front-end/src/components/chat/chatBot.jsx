import React, { useState } from 'react';
import { generateGeminiResponse } from '../../utils/geminiClient'; // Updated to fetch version
import { motion } from "framer-motion";
import { Bot, User } from 'lucide-react';

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    setChat(prev => [...prev, { sender: 'user', message: input }]);

    try {
      const reply = await generateGeminiResponse(input);

      setChat(prev => [...prev, { sender: 'ai', message: reply }]);
      setInput('');
    } catch (err) {
      console.error(err);
      setError('⚠️ ' + err.message);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700"
        >
          💬
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-80 h-[500px] bg-white border shadow-lg rounded-xl flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
            <span>Gemini ChatBot</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && <Bot className="text-blue-600" size={18} />}
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-xl ${
                    msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'
                  }`}
                >
                  {msg.message}
                </div>
                {msg.sender === 'user' && <User className="text-gray-600" size={18} />}
              </div>
            ))}
            {error && <p className="text-red-600 text-xs">{error}</p>}
          </div>

          <div className="flex items-center p-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 p-2 border rounded-l-lg outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatBot;
