import { useSelector } from "react-redux";
import { selectAppointments } from "../../features/appointmentBooking/AppointmentSlice";

const AppointmentTable = () => {
    const appointments = useSelector(selectAppointments);

    return (
        <div className="rounded-lg p-4 mb-10">
            <h3 className="text-xl font-semibold mb-4">Appointments</h3>
            <div className="hidden md:flex font-semibold bg-blue-200 p-3 rounded-xl">
                <div className="w-1/4">Date</div>
                <div className="w-1/4">Time</div>
                <div className="w-1/4">Patient</div>
                <div className="w-1/4">Status</div>
            </div>
            <div className="flex flex-col">
                {appointments.map((appt, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between py-3 px-10 gap-2 hover:bg-blue-50 rounded"
                    >
                        <div className="w-full md:w-1/4">{appt.date}</div>
                        <div className="w-full md:w-1/4">{appt.time}</div>
                        <div className="w-full md:w-1/4">{appt.doctor}</div>
                        <div className="w-full md:w-1/4">
                            <button className="btn btn-lg bg-[#2A6F97] text-white w-full">
                                    {appt.status === 'upcoming' ? 'Join' : 'Closed'}
                                </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AppointmentTable


import React from "react";


