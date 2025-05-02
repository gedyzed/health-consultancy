import React from "react";

const DoctorCard = ({ name, title, rating, onBook }) => {
  return (
    <div className="card bg-base-100 shadow-md text-center w-50">
      <div className="card-body items-center">
        <div className="w-16 h-16 rounded-full bg-gray-300 mb-3" />
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-sm text-gray-500">{rating}</p>
        <div className="card-actions mt-2">
          <button onClick={onBook} className="btn btn-primary btn-md w-30 rounded-lg">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
