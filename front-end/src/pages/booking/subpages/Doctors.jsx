import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecializedDoctors } from '../../../features/booking/bookingSliceApi';
import DoctorCards from './DoctorCards';
import FAQSection from "./FAQSection";
import MainHeader from '../../../components/layouts/MainHeader';
import Navbar from '../../../components/layouts/Navbar';
import NoDoctorsFound from './nodoctor';

const Doctors = () => {
  const { name:specializationName} = useParams();
  console.log(specializationName,"name");
  const dispatch = useDispatch();
  const { 
    doctors, 
    fetchStatus,
    fetchError
  } = useSelector((state) => state.booking);

  useEffect(() => {
    if (specializationName) {
      dispatch(fetchSpecializedDoctors(specializationName));
    }
  }, [specializationName, dispatch]);

  // Render loading state
  if (fetchStatus === 'loading') {
    return (
      <div>
        <MainHeader />
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center py-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (fetchStatus === 'failed') {
    return (
      <div>
        <MainHeader />
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="alert alert-error max-w-2xl mx-auto">
            <div className="flex-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <label>Error loading doctors: {fetchError?.message || 'Unknown error'}</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
  console.log(doctors,"doctors")
  // Render empty state
  if (fetchStatus === 'succeeded' && doctors.length === 0) {
    return (
      <div>
        <MainHeader />
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <NoDoctorsFound specialization={specializationName} />
        </div>
      </div>
    );
  }

  // Render doctors list
  return (
    <div>
      <MainHeader />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold capitalize">
            {specializationName} Specialists
          </h1>
          <p className="text-gray-600 mt-2">
            {doctors.length} specialist{doctors.length > 1 ? 's' : ''} found
          </p>
        </div>
        <DoctorCards />
        <FAQSection />
      </div>
    </div>
  );
};

export default Doctors;
