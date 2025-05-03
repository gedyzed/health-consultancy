import { useSelector } from "react-redux";
import { selectAppointments } from '../../features/appointmentBooking/AppointmentSlice';

const AppointmentTable = ({ title }) => {
  const appointments = useSelector(selectAppointments);

  const filtered = appointments.filter((a) =>
    title.includes("Upcoming") ? a.status === "upcoming" : a.status === "closed"
  );

  return (
    <div className="my-6 text-dark-900 font-semi-bold">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="overflow-x-auto rounded-box border border-base-300 p-4">
        <table className="table w-full">
          <thead className="bg-blue-300">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Patient</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500 italic">
                  No appointments found.
                </td>
              </tr>
            ) : (
              filtered.map((a, index) => (
                <tr key={index} className="bg-blue-100 border-b border-base-200">
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>{a.patient}</td>
                  <td>
                    <button className="btn bg-[#2A6F97] btn-sm px-10 py-2 rounded-box text-white">
                      {a.status === 'upcoming' ? 'Join' : 'Closed'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;

