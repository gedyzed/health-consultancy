import { IoIosNotifications } from "react-icons/io";
import Navbar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

import SummaryCards from '../components/cards/SummaryCards';
import AppointmentsTable from '../components/appointments/AppointmentTable';
import CommentsSection from '../components/comments/CommentsSection';
import ChatBotButton from '../components/chat/ChatBotButton';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAppointments } from '../features/appointmentBooking/appointmentSlice';

import logo from '../assets/logo.svg';

const Dashboard = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Fetch appointments when the component mounts
    dispatch(fetchAppointments());


  

  }, [dispatch]);

  return (
    <div className="font-serif min-h-screen bg-white text-gray-800 flex flex-col justify-between">
      
      {/* Header Section */}
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

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8 flex-grow">
        
        {/* Welcome Message */}
        <section className="relative text-center my-6 bg-blue-100 p-4 rounded-lg shadow-md h-32 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold drop-shadow-md">
              Welcome back, Haile Asaye
            </h2>
            <p className="italic text-gray-700">"Stay hydrated today!"</p>
          </div>
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <ChatBotButton />
          </div>
        </section>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Appointments and Comments Section */}
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          <div className="flex-1 space-y-6">
            <AppointmentsTable title="Upcoming Appointment" />
            <AppointmentsTable title="Closed Appointment" />
          </div>
          <aside className="w-full lg:w-[30%]">
            <CommentsSection />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
