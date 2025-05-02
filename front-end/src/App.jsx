
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import HomePage from "./pages/homepage/HomePage";
import Footer from "./components/layouts/Footer";
import ContactPage from "./pages/homepage/subpages/Contact";
import Services from "./pages/homepage/subpages/Services";
import LoginPage from "./pages/login/LoginPage";
import RegistorPage from "./pages/register/RegistorPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = "279776484984-el62cf8hhv3hhovspg4b58ko1jgn5oe9.apps.googleusercontent.com";


function App() {

function App() {
  return (

    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <div className="flex flex-col justify-between min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistorPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LocalizationProvider>
    </GoogleOAuthProvider>
  );
    <>
    <div className="text-7xl">Hello Team</div>
    </>
  )
}

export default App;
