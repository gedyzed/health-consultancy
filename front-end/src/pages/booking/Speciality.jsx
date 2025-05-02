import DoctorCards from "./subpages/DoctorCards";
import FAQSection from "./subpages/FAQSection"


const Speciality = () => {
  return (
    <div className="p-6 space-y-8">
      <DoctorCards />
      <FAQSection />
    </div>
  );
};

export default Speciality;
