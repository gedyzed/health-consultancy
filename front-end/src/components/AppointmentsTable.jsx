import { useSelector } from 'react-redux';
import { selectAppointments } from './features/appointmentBooking/appointmentSlice';

const AppointmentsTable = ({ title }) => {
  const appointments = useSelector(selectAppointments);

  return (
    <div className="my-6 text-dark-900 font-semi-bold">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="overflow-x-auto rounded-box border border-base-300 p-4">
        <table className="table w-full">
          <thead className="bg-blue-300">
            <tr className="rounded-full rounded-tr-lg rounded-br-lg">
              <th className="rounded-tl-lg">Date</th>
              <th>Time</th>
              <th>Patient</th>
              <th className="rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, index) => (
              <tr key={index} className="bg-blue-100 border-b border-base-200">
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.patient}</td>
                <td>
                  <button className="btn bg-[#2A6F97] btn-sm px-10 py-2 rounded-box text-white">
                    Join
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;
