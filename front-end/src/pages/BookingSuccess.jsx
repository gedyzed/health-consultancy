

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearBooking } from "../features/appointmentBooking/bookingSlice";
import { CheckCircle, Clock, DollarSign, User } from "lucide-react";
import MainHeader from "../components/layout/MainHeader";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

export default function BookingSuccess() {
  const booking = useSelector((state) => state.booking);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDone = () => {
    dispatch(clearBooking());
    navigate("/dashboard"); // Or any page you want
  };

  return (
    <div>
      <MainHeader/>
      <Navbar/>
 
    <div className="font-serif min-h-screen flex items-center justify-center bg-[#f0f8ff] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center">
        <div className="flex justify-center mb-4">
         <CheckCircle size={64} className="text-[#2A6F97]" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">Booking success!</h2>
        <p className="text-sm text-gray-500 mb-6">
          Thank you for booking your consultation.
        </p>

        <hr className="border-[#2A6F97]/30 mb-6" />

        <div className="bg-[#f9fbfc] border border-gray-200 rounded-xl p-6 text-left space-y-4 shadow-inner">
          <div className="text-sm font-semibold">
            Booking ID: <span className="text-[#2A6F97]">{booking.bookingId}</span>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-700">
        <User className="text-[#2A6F97]" size={18} />
            <div>
              <span className="font-semibold">{booking.doctor.name}</span> – {booking.doctor.specialty}
              <div>
                Link:{" "}
                <a
                  href={booking.doctor.profileLink}
                  className="text-blue-600 underline text-xs"
                >
                  {booking.doctor.profileLink}
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="text-[#2A6F97]" size={18} />
            {booking.time}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
          <DollarSign className="text-[#2A6F97]" size={18} />
            {booking.price}
          </div>
        </div>
<div className ="flex justify-end mt-4">
        <button
          onClick={handleDone}
          className=" flex flex-start mt-6 bg-[#2A6F97] hover:bg-[#1e5c82] cursor-pointer  text-white px-6 py-2 rounded-full shadow transition duration-300"
        >
          Done
        </button>

        </div>

        <p className="mt-6 text-xs text-gray-400">
          Need Help? Contact us at <a href="mailto:thisemail@gmail.com" className="underline">thisemail@gmail.com</a>
        </p>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
