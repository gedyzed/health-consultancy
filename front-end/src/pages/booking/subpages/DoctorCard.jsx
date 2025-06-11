import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { setId, setPp, setPayment, setNonAvailableTime, setName } from "../../../features/booking/bookingSliceApi";
import pp from "../../../assets/avatar.svg"

const DoctorCard = ({ doctor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Set doctor details in Redux store when component mounts
  useEffect(() => {
    dispatch(setId(doctor.doctor_id));
    dispatch(setPp(doctor.image || null));
    dispatch(setPayment(doctor.pricing || null));
    dispatch(setName(doctor.fullName));
    

  }, [doctor, dispatch]);
console.log(doctor)
  return (
    <div className="card bg-base-100 shadow-md text-center w-full">
      <div className="card-body items-center">
        {doctor.image ? (
          <img 
            src={pp} 
            alt={doctor.fullName} 
            className="w-16 h-16 rounded-full object-cover mb-3"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 mb-3 flex items-center justify-center">
            <span className="text-gray-600 text-xl font-bold">
              {doctor.fullName.charAt(0)}
            </span>
          </div>
        )}
        <h3 className="font-bold text-lg">{doctor.fullName}</h3>
        <p className="text-sm text-gray-600">{doctor.title}</p>
        <p className="text-sm text-gray-500">Rating: {doctor.rating}</p>
        <p className="text-sm text-gray-500">Experience: {doctor.yearOfExperience} years</p>
        <div className="card-actions mt-2">
          <Link 
            to={`/book/${doctor.doctor_id}`} 
            className="btn btn-primary btn-md w-30 rounded-lg"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
