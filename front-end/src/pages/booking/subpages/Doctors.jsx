import React from 'react'
import DoctorCards from './DoctorCards';
import FAQSection from "./FAQSection"
import MainHeader from '../../../components/layouts/MainHeader';
import Navbar from '../../../components/layouts/Navbar';

const Doctors = () => {
  return (
    <div>
      <MainHeader />
      <Navbar />
      <DoctorCards />
      <FAQSection />
    </div>
  )
}

export default Doctors


