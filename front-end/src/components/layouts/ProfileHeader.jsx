import React from 'react';
import logo from '../../assets/home_page/icons/Logo.svg';

const ProfileHeader = () => {
  return (
    <header className="bg-[#0078b8] px-4 py-2 flex justify-between items-center shadow-md">
      <div className="text-white text-lg font-bold tracking-wide">
 <img src={logo} alt="Health Consultancy Logo" className="h-12 w-auto" />
        
      </div>
      <button className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-[#0078b8] mr-20">
        Login
      </button>
    </header>
  );
};

export default ProfileHeader;