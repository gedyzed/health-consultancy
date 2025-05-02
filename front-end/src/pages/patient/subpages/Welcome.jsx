import { Link } from "react-router-dom"
const Welcome = ({ name }) => {
  return (
    <div className="bg-blue-50 py-4 flex justify-between items-center rounded-md">
      <div className="text-center mx-auto">
        <h2 className="text-lg font-bold">Welcome back <span className="font-extrabold">{name}</span></h2>
        <p className="text-sm text-gray-600 italic">"Stay hydrated today!"</p>
      </div>
      <Link to="/"  className="bg-[#2A6F97] text-white px-4 py-2 rounded-l-full font-medium shadow">
        ChatBot
      </Link>
    </div>
  );
};

export default Welcome;
