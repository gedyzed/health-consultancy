import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = ({ showSearch = true }) => {
  return (
    <nav className="navbar bg-[#2A6F97] text-white px-4 md:px-6 ml-2 md:ml-6 rounded-box">
      <div className="flex flex-wrap md:flex-nowrap items-center w-full gap-4">

        <div className="flex flex-wrap justify-around gap-4 md:gap-20 flex-grow">
          <Link to="/dashboard" className="btn btn-ghost text-white font">Dashboard</Link>
          <Link to="/patients" className="btn btn-ghost text-white">Patient List</Link>
          <Link to="/calendar" className="btn btn-ghost text-white">Calendar</Link>
          <Link to="/help-center" className="btn btn-ghost text-white">Help</Link>
        </div>


        {showSearch && (
          <div className="relative w-full md:w-64 mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Search..."
              className="input pl-10 text-black rounded-xl w-full h-10 bg-[#f5f6f7] placeholder-gray-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-800 text-md" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;