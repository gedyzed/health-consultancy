import Booking from "./subpages/Booking";
import { DateProvider } from "../../context/DateContext";
const BookingPage = () => {
  return (
    <DateProvider>
      <Booking />
    </DateProvider>
  );
};

export default BookingPage;
