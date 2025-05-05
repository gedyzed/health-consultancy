import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorDashboardSummary } from "../../features/doctors/doctorDashboardSlice";

const SummaryCards = () => {
  const dispatch = useDispatch();
  const {
    totalAppointments,
    todaysAppointments,
    totalRevenue,
    averageRating,
    loading,
    error
  } = useSelector((state) => state.doctorDashboard);

  useEffect(() => {
    dispatch(fetchDoctorDashboardSummary());
  }, [dispatch]);

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <Card title="Total Appointments" value={totalAppointments} />
      <Card title="Today’s Appointments" value={todaysAppointments} />
      <Card title="Revenue" value={`$${totalRevenue}`} />
      <Card title="Rating" value={averageRating} />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-md p-6 text-center">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-2xl font-bold text-blue-600 mt-2">{value}</p>
  </div>
);
export default SummaryCards;