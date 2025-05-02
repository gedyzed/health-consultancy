import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile } from '../features/profile/profileSlice';
import ProfileHeader from '../components/layout/ProfileHeader';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    about: '',
    specialization: '',
    workExperience: '',
    institution: '',
    languages: '',
    degree: '',
    price: '',
    graduationYear: '',
    certification: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optionally validate numeric inputs here
    const formattedForm = {
      ...form,
      workExperience: Number(form.workExperience),
      price: Number(form.price),
      graduationYear: Number(form.graduationYear),
    };

    dispatch(setProfile(formattedForm));

    // Simple browser alert (since no toaster)
    alert('Profile updated successfully!');
  };

  return (

    <div>
      <ProfileHeader/>
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-center text-xl font-bold text-[#0078b8]">
        Set your profile well for better job experience
      </h1>
       
      <div className="w-full max-w-sm mx-auto flex flex-col gap-2 items-center ">
      <label htmlFor="image-upload" className=' cursor-pointer w-32 h-32 rounded-full p-6 text-sm text-[#0078b8] border border-[#0078b8]  hover:border-blue-500 hover:text-blue-500'>
        <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
          />
      </label>
      <label htmlFor="image-upload" className='text-sm text-[#0078b8]'>Add Profile</label>
    </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="About Me" className='text-sm text-[#0078b8]'>About Me</label>
        <textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          required
          className="p-3 w-full border rounded-lg border-[#0078b8] focus:outline-[#0078b8]"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className='flex flex-col gap-2'>
          <label htmlFor="Specialization" className='text-sm text-[#0078b8]'>Specialization</label>
          <input
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            required
            className="p-2 w-full border rounded-lg border-[#0078b8] focus:outline-[#0078b8]"
          />
        </div>
        
         <div className='flex flex-col gap-2'>
          <label htmlFor="WorkExperiance" className='text-sm text-[#0078b8]'>Work Experiance</label>
            <input
              type="number"
              name="workExperience"
              value={form.workExperience}
              onChange={handleChange}
              required
              className="p-2 w-full border rounded-lg border-[#0078b8] focus:outline-[#0078b8]"
            />
         </div>
        
        <div className='flex flex-col gap-2'>
          <label htmlFor="Institution of Graduation" className='text-sm text-[#0078b8]'>Institution of Graduation</label>
          <input
            name="institution"
            value={form.institution}
            onChange={handleChange}
            required
            className="p-2 w-full border rounded-lg border-[#0078b8] focus:outline-[#0078b8]"
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="LanguagesSpoken" className='text-sm text-[#0078b8]'>Languages spoken</label>
          <input
            name="languages"
            value={form.languages}
            onChange={handleChange}
            required
            className="p-2 w-full border rounded-lg border-[#0078b8] focus:outline-[#0078b8]"
          />
        </div>
        

        <div className='flex flex-col gap-2'>
          <label htmlFor="DegreeEarned" className='text-sm text-[#0078b8]'>Degree Earned</label>
          <input
            name="degree"
            value={form.degree}
            onChange={handleChange}
            required
            className="p-2 w-full border rounded-lg border-[#0078b8] focus:outline-[#0078b8]"
          />
        </div>
       

        <div className='flex flex-col gap-2'>
          <label htmlFor="price" className='text-sm text-[#0078b8]'>Price per slot (30 min)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="p-2 w-full border rounded-lg border-[#0078b8] focus:outline-[#0078b8]"
          />
        </div>
        

        <div className='flex flex-col gap-2'>
          <label htmlFor="graduationYear" className='text-sm text-[#0078b8]'>Graduation Year</label>
          <input
            type="number"
            name="graduationYear"
            value={form.graduationYear}
            onChange={handleChange}
            required
            className="p-2 w-full border rounded-lg border-[#0078b8] focus:outline-[#0078b8]"
          />
        </div>
        

        <div className='flex flex-col gap-2'>
          <label htmlFor="CertificationAndNationalID" className='text-sm text-[#0078b8]'>Certification and national ID</label>
          <input
            name="certification"
            value={form.certification}
            onChange={handleChange}
            required
            className="p-2 w-full border rounded-lg border-[#0078b8] focus:outline-[#0078b8] "
          />
        </div>
      </div>

      <button type="submit" className="p-2 w-full text-white bg-[#0078b8] border border-[#0078b8] rounded-lg hover:bg-[#00649a]">
        Set Profile
      </button>
    </form>
    </div>
  );
};

export default ProfilePage;
