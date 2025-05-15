import { useState,  useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppointmentTable from '../../components/appointments/Appointment'
import TopSearchedSpecialty from './subpages/TopSearchedSpecialty'
import DailyHealthTips from './subpages/DailyHealthTips'
import Welcome from './subpages/Welcome'
import MainHeader from "../../components/layouts/MainHeader"
import Navbar from '../../components/layouts/Navbar'
import Footer from '../../components/layouts/Footer'
import { fetchAppointments } from '../../features/appointmentBooking/AppointmentSlice'

const PatientDashBoard = () => {
  
  const [name, setName] = useState("Tomas Abel");
  const dispatch = useDispatch();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);
    
  return (
    <div>
      <MainHeader />
      <Navbar showSearch={true}/>
    <div className="px-10">
        <Welcome name={name} />
        <AppointmentTable/>
        <TopSearchedSpecialty />
        <DailyHealthTips />
    </div>
     <Footer />
    </div>

  )
}

export default PatientDashBoard
