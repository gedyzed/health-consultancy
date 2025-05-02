import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import  EditProfilePage   from "./pages/EditProfilePage";
import HelpCenter from "./pages/HelpCenter";
import BookingSuccess from "./pages/BookingSuccess";
import PatientSetProfile from "./pages/PatientSetProfile";



function App() {
  return (
    <Router>
      <Routes>
    
  <Route path="/" element={<Dashboard />} />
  <Route path="/set-profile" element={<ProfilePage/>} />
  <Route path="/edit-profile" element={<EditProfilePage />} />
  <Route path ="/help-center" element ={<HelpCenter/>}/>
  <Route path ="/booking-success" element ={<BookingSuccess/>}/>
  <Route path ="/patient-set-profile" element ={<PatientSetProfile/>}/>


       
      </Routes>
    </Router>
  );
}

export default App;