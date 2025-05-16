import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setId, setPp, setPayment, setNonAvailableTime, setName } from "../../features/booking/bookingSliceApi";
import { unwrapResult } from "@reduxjs/toolkit";

const DoctorCard = ({ doctor }) => {

    dispatch(setId(doctor.doctor_id));
    dispatch(setPp(doctor.image));
    dispatch(setPayment(doctor.pricing));
    dispatch(setName(doctor.fullName));

    useEffect(() => {
  
          const init = async () => {
              try{
                const resultAction = await dispatch(getUserToken(targetDoctor.id))
                const { data } = unwrapResult(resultAction);
        
                if(!data){
                    navigate("/dashboard")
                  return; 
        
                }
                dispatch(setNonAvailableTime(data));
              }
              catch(err) {
                console.log("Failed to fetch doctors", err)
                navigate("/dashboard")
              } 
            }
            init();
    
        }, [title])



  return (
    <div className="card bg-base-100 shadow-md text-center w-50">
      <div className="card-body items-center">
        <div className="w-16 h-16 rounded-full bg-gray-300 mb-3" />
        <h3 className="font-bold text-lg">{doctor.fullName}</h3>
        <p className="text-sm text-gray-600">{doctor.title}</p>
        <p className="text-sm text-gray-500">{doctor.rating}</p>
        <p className="text-sm text-gray-500">{doctor.rating}</p>
        <div className="card-actions mt-2">
          <Link to="/book" onClick={onBook} className="btn btn-primary btn-md w-30 rounded-lg">
            Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
