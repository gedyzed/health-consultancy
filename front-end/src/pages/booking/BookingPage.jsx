import Booking from "./subpages/Booking";
import { DateProvider } from "../../context/DateContext";
import { useParams } from "react-router-dom";
const BookingPage = () => {
  const Params = useParams();
  const doctorId = Params.id;

  return (
    <DateProvider>
      <Booking doctorId={doctorId} />
    </DateProvider>
  );
};

export default BookingPage;
