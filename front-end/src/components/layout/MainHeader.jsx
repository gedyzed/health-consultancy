import { IoIosNotifications } from "react-icons/io";
import logo from '../../assets/logo.svg';

const MainHeader =()=>{


return (

<header className="flex flex-col sm:flex-row justify-between items-center mt-4 px-4 sm:px-8 gap-4">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Health Consultancy Logo" className="h-12 w-auto" />
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-3xl text-[#2A6F97]">
            <IoIosNotifications />
          </div>
          <img 
            className="w-10 h-10 rounded-full bg-gray-300 object-cover" 
            alt="User Avatar" 
          />
        </div>
      </header>


);
}


export default MainHeader;