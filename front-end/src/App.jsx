// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

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
import PatientSetProfile from "./pages/patient/profile/PatientSetProfile";
import BookingPage from "./pages/booking/BookingPage";
import BookingSuccess from "./pages/booking/BookingSuccessful";

// Doctor Pages
import DoctorDashBoard from "./pages/doctors/DoctorDashBoard";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/doctors/Profile/ProfilePage";
import EditProfile from "./pages/doctors/Profile/EditProfile";
import HelpCenter from "./pages/HelpCenter";

// 404
const NotFound = () => <div className="text-center text-xl mt-10">404 - Page Not Found</div>;

const CLIENT_ID = "YOUR_CLIENT_ID_HERE";

function App() {
  const token = useSelector((state) => state.login.token);
  const user = useSelector((state) => state.login.user);

  const isAuthenticated = !!token;
  const userRole = user?.role;

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
                {/* Public */}
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistorPage />} />

                {/* Patient */}
                <Route
                  path="/patient-dashboard"
                  element={
                    <ProtectedRoute isAllowed={isPatient}>
                      <PatientDashBoard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/patient/book"
                  element={
                    <ProtectedRoute isAllowed={isPatient}>
                      <BookingPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/patient/booking-success"
                  element={
                    <ProtectedRoute isAllowed={isPatient}>
                      <BookingSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/patient/set-profile"
                  element={
                    <ProtectedRoute isAllowed={isPatient}>
                      <PatientSetProfile />
                    </ProtectedRoute>
                  }
                />

                {/* Doctor */}
                <Route
                  path="/doctor-dashboard"
                  element={
                    <ProtectedRoute isAllowed={isDoctor}>
                      <DoctorDashBoard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/chat"
                  element={
                    <ProtectedRoute isAllowed={isDoctor}>
                      <ChatPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/set-profile"
                  element={
                    <ProtectedRoute isAllowed={isDoctor}>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/edit-profile"
                  element={
                    <ProtectedRoute isAllowed={isDoctor}>
                      <EditProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/help-center"
                  element={
                    <ProtectedRoute isAllowed={isDoctor}>
                      <HelpCenter />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
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
