import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Navbar from '../../components/layouts/Navbar';
import Footer from '../../components/layouts/Footer';
import SummaryCards from '../../components/cards/SummaryCards';
import AppointmentsTable from '../../components/appointments/AppointmentTable';
import CommentsSection from '../../components/comments/CommentSection';
import ChatBotButton from '../../components/chat/ChatBotButton';
import ChatWindow from '../../components/chat/chatWindow';
import MainHeader from '../../components/layouts/MainHeader';

import { fetchAppointments } from "../../features/appointmentBooking/AppointmentSlice";

const DoctorDashBoard = () => {
  const dispatch = useDispatch();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <div className="font-serif min-h-screen bg-white text-gray-800 flex flex-col justify-between">

      {/* Header Section */}
      <MainHeader />
      <Navbar  />
      <main className="p-4 sm:p-6 lg:p-8 flex-grow">
        <section className="relative text-center my-6 bg-blue-100 p-4 rounded-lg shadow-md h-32 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold drop-shadow-md">
              Welcome back, Haile Asaye
            </h2>
            <p className="italic text-gray-700">"Stay hydrated today!"</p>
          </div>

          {!isChatOpen && (
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-40">
              <ChatBotButton onClick={() => setIsChatOpen(true)} />
            </div>
          )}

          {/* Chat Window */}
          {isChatOpen && (
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50">
              <ChatWindow onClose={() => setIsChatOpen(false)} />
            </div>
          )}
        </section>

        {/* Summary Cards */}
        <SummaryCards />
        <ChatBot />

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

      <Footer />
    </div>
  );
};

export default DoctorDashBoard;