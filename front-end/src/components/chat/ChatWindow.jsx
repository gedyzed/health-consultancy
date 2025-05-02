import { useRef } from "react";

export default function ChatWindow({ onClose }) {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset
      textarea.style.height = `${textarea.scrollHeight}px`; // adjust
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-2xl shadow-xl p-4 w-80 flex flex-col h-96">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-[#2A6F97]">ChatBot</h3>
        <button
          onClick={onClose}
          className="text-red-500 font-semibold  cursor-pointer text-sm hover:underline"
        >
          Close
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto text-sm text-gray-700 space-y-2 mb-3">
        <p className="italic text-gray-600">Hi! How can I help you today?</p>
        {/* More messages go here */}
      </div>

      {/* Input + Button */}
      <div className="flex flex-col gap-2">
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          placeholder="Type your message..."
          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2A6F97] resize-none overflow-hidden"
        />
        <button className="bg-[#2A6F97] text-white text-sm font-semibold py-2 rounded-lg cursor-pointer hover:bg-[#245d7e] transition duration-200">
          Ask
        </button>
      </div>
    </div>
  );
}
