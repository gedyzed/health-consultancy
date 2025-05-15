
import { useSelector, useDispatch } from "react-redux";
import { updateField, resetProfile } from "../../../features/profile/patientSetProfileSlice";
import MainHeader from "../../../components/layouts/MainHeader";
import Navbar from "../../../components/layouts/Navbar";
import UploadCertification from "../../UploadCertification";
import AddProfile from "../../AddProfile";
import { submitPatientProfile } from "../../../features/profile/patientProfileSetAPI";

export default function PatientSetProfile() {
  const profile = useSelector((state) => state.patientSetProfile);
  const dispatch = useDispatch();

  const handleChange = (field) => (e) => {
    const value = e.target.files ? e.target.files[0] : e.target.value;
    dispatch(updateField({ field, value }));
  };

 

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(submitPatientProfile(profile));
};

  return (
    <div>
        <MainHeader/>
        <Navbar/>
   
    <div className=" font-serif min-h-screen flex items-center justify-center bg-base-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8  rounded-xl w-full l space-y-6">
        <h2 className="text-2xl font-bold text-center text-shadow-blue-500">Set your personal profile</h2>

       <AddProfile/> 
        <div className="flex justify-center">
          <input type="file" accept="image/*" onChange={handleChange("profileImage")} className="file-input file-input-bordered file-input-sm" />
        </div>
<label htmlFor="about me" className ="text-dark-500"> About me 
        <textarea
        id ="about me"
          
          className="textarea textarea-bordered w-full rounded-2xl border border-blue-400"
          value={profile.about}
          onChange={handleChange("about")}
        />

        </label>

           
        <div className="grid grid-cols-2 gap-4 pt-6">
  <div className="flex flex-col  ">
    <label htmlFor="name" className="mb-1">Full Name</label>
    <input
      type="text"
      id="name"
      className="input input-bordered rounded-2xl w-full border border-blue-400"
      value={profile.fullName}
      onChange={handleChange("fullName")}
    />
   <UploadCertification/>
    
  </div>

  <div className="flex flex-col">
    <label htmlFor="gender" className="mb-1">Gender</label>
    <input
      type="text"
      id="gender"
      className="input input-bordered rounded-2xl w-full border border-blue-400"
      value={profile.gender}
      onChange={handleChange("gender")}
    />
  </div>
</div>


        <button type="submit" className=" cousor-pointer bg-[#0078b8] w-full rounded-2xl text-center text-white">Set Profile</button>
      </form>
      </div>
    </div>
  );
}