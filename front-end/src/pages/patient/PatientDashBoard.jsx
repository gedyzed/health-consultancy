import { useState } from 'react'
import AppointmentTable from '../../components/appointments/Appointment'
import TopSearchedSpecialty from './subpages/TopSearchedSpecialty'
import DailyHealthTips from './subpages/DailyHealthTips'
import Welcome from './subpages/Welcome'
import MainHeader from "../../components/layouts/MainHeader"
import Navbar from '../../components/layouts/Navbar'
import Footer from '../../components/layouts/Footer'

const PatientDashBoard = () => {
    const [name, setName] = useState("Tomas Abel")
    const appointments = [
    { date: "May 20, 2025", time: "11:23 pm", patient: "Cooper, Kristin", status: "Join" },
    { date: "May 20, 2025", time: "11:23 pm", patient: "Cooper, Kristin", status: "Join" },
    { date: "May 20, 2025", time: "11:23 pm", patient: "Cooper, Kristin", status: "Join" },
  ];
    
  return (
    <div>
      <MainHeader />
      <Navbar showSearch={true}/>
    <div className="px-10">
        <Welcome name={name} />
        <AppointmentTable appointments={appointments}/>
        <TopSearchedSpecialty />
        <DailyHealthTips />
    </div>
     <Footer />
    </div>

  )
}

export default PatientDashBoard
