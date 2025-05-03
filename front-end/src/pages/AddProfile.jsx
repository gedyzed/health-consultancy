import React from 'react';

const AddProfile = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 mt-6">
      <div className="w-28 h-28 rounded-full border-2 border-blue-700 flex items-center justify-center text-blue-700 cursor-pointer hover:opacity-80 transition">
        {/* Optional: Add an icon like "+" here */}
      </div>
      <button className="text-blue-700 font-semibold underline hover:text-blue-900 transition text-sm">
        Add profile
      </button>
    </div>
  );
};

export default AddProfile;