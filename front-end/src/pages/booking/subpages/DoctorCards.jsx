import React from 'react';
import { useSelector } from 'react-redux';
import DoctorCard from './DoctorCard';  // Make sure to import DoctorCard

const DoctorCards = () => {
  const doctors = useSelector((state) => state.booking.doctors);
  return (
   
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {doctors.map(doctor => (
        <DoctorCard key={doctor.doctor_id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorCards;
