import React from 'react';
import { Link } from 'react-router-dom';

const NoDoctorsFound = ({ specialization }) => {
  return (
    <div className="text-center py-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">No Doctors Found</h1>
        <p className="mb-6">
          We couldn't find any doctors specializing in {specialization}.
        </p>
        <Link 
          to="/specializations" 
          className="btn btn-primary"
        >
          Browse Other Specializations
        </Link>
      </div>
    </div>
  );
};

export default NoDoctorsFound;
