export default function ChatBotButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="bg-[#2A6F97] hover:bg-[#1e5c82] cursor-pointer  text-white px-5 py-3 rounded-full shadow-lg transition duration-300 ease-in-out"
      >
        Chatbot
      </button>
    );
  }