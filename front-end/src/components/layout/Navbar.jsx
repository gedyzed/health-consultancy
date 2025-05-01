import { FaSearch } from "react-icons/fa";



export default function  Navbar  () {
    return (
      <div className="navbar bg-[#2A6F97] text-white px-6 ml-6 rounded-box ">
     <div className ="flex items-center  gap-4">
        <div className="flex gap-4">
          <a className="btn btn-ghost text-white font">Dashboard</a>
          <a className="btn btn-ghost text-white">Patient List</a>
          <a className="btn btn-ghost text-white">Calendar</a>
          <a className="btn btn-ghost text-white">Help</a>
        </div>
        
      </div>
      {/*make the search icon inside the search input to the left of the search bar */}
        <div className=" relative block flex items-center  ml-auto">
            <input type="text"  className="input text-white rounded-xl w-64 h-8 mr-10" />
            <div  className=" absolute inset-y-0 left-0 flex items-center pl-2  ml-1">
            <FaSearch className ="text-gray-900 text-2xl" />
            </div>
      

      </div>
      </div>
    );
  };
  
