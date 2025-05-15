import { useState } from 'react'
import AppointmentTable from '../../components/appointments/Appointment'
import TopSearchedSpecialty from './subpages/TopSearchedSpecialty'
import DailyHealthTips from './subpages/DailyHealthTips'
import Welcome from './subpages/Welcome'

const DashBoard = () => {
    const [name, setName] = useState("Tomas Abel")
    const appointments = [
    { date: "May 20, 2025", time: "11:23 pm", patient: "Cooper, Kristin", status: "Join" },
    { date: "May 20, 2025", time: "11:23 pm", patient: "Cooper, Kristin", status: "Join" },
    { date: "May 20, 2025", time: "11:23 pm", patient: "Cooper, Kristin", status: "Join" },
  ];
    
  return (
    <div className="px-10">
        <Welcome name={name} />
        <AppointmentTable appointments={appointments}/>
        <TopSearchedSpecialty />
        <DailyHealthTips />
    </div>
  

  )
}

export default DashBoard
