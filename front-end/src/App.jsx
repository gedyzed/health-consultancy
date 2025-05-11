import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Layouts
import MainNavbar from "./components/layouts/MainNavbar";
import MainFooter from "./components/layouts/MainFooter";

// Public Pages
import HomePage from "./pages/homepage/HomePage";
import ContactPage from "./pages/homepage/subpages/Contact";
import Services from "./pages/homepage/subpages/Services";
import LoginPage from "./pages/login/LoginPage";
import RegistorPage from "./pages/register/RegistorPage";

// Patient Pages
import PatientDashBoard from "./pages/patient/PatientDashBoard";
import ProfilePage from "./pages/doctors/Profile/ProfilePage";
import EditProfile from "./pages/doctors/Profile/EditProfile";
import HelpCenter from "./pages/HelpCenter";
import BookingSuccess from "./pages/booking/BookingSuccessful";
import PatientSetProfile from "./pages/patient/profile/PatientSetProfile";
import BookingPage from "./pages/booking/BookingPage";

// Doctor Pages
import ChatPage from "./pages/ChatPage";
import DoctorDashBoard from "./pages/doctors/DoctorDashBoard";

const CLIENT_ID = "279776484984-el62cf8hhv3hhovspg4b58ko1jgn5oe9.apps.googleusercontent.com";

function App() {
  const isAuthenticated = false; // Set to true if user is logged in
  const userRole = "patient"; // or "doctor"

  const isDoctor = isAuthenticated && userRole === "doctor";
  const isPatient = isAuthenticated && userRole === "patient";

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <div className="flex flex-col justify-between min-h-screen">
            {!isAuthenticated && <MainNavbar />}

            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistorPage />} />

                {/* Patient Routes */}
             {/* }   {isPatient && (*/}
                  <>
                    <Route path="/dashboard" element={<PatientDashBoard />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/help-center" element={<HelpCenter />} />
                    <Route path="/booking-success" element={<BookingSuccess />} />
                    <Route path="/patient-set-profile" element={<PatientSetProfile />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/book" element={<BookingPage />} />
                  </>
             {/*   )}

                {/* Doctor Routes */}
               {/* {isDoctor && ( */}
                  <>
                    <Route path="/dashboard" element={<DoctorDashBoard />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/set-profile" element={<ProfilePage />} />
                    <Route path="/help-center" element={<HelpCenter />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                  </>
             {/*   )} */}
              </Routes>
            </main>

            {!isAuthenticated && <MainFooter />}
          </div>
        </Router>
      </LocalizationProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
