import React, { useState } from 'react';
import MainHeader from '../../../components/layouts/MainHeader';
import Navbar from '../../../components/layouts/Navbar';
import Footer from '../../../components/layouts/Footer';


const EditProfilePage = () => {
  const [form, setForm] = useState({
    name: '',
    rate: '',
    experience: '',
    specialization: '',
    specializations: [],
    institution: '',
    degree: '',
    graduationYear: '',
    educationList: [],
    languages: [],
    languageInput: '',
    about: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addSpecialization = () => {
    if (form.specialization && !form.specializations.includes(form.specialization)) {
      setForm({
        ...form,
        specializations: [...form.specializations, form.specialization],
        specialization: '',
      });
    }
  };

  const removeSpecialization = (index) => {
    const updated = [...form.specializations];
    updated.splice(index, 1);
    setForm({ ...form, specializations: updated });
  };

  const addEducation = () => {
    if (form.degree && form.institution && form.graduationYear) {
      const newEntry = `${form.degree}, ${form.institution}:${form.graduationYear}`;
      setForm({
        ...form,
        educationList: [...form.educationList, newEntry],
        degree: '',
        institution: '',
        graduationYear: '',
      });
    }
  };

  const removeEducation = (index) => {
    const updated = [...form.educationList];
    updated.splice(index, 1);
    setForm({ ...form, educationList: updated });
  };

  const addLanguage = () => {
    if (form.languageInput && !form.languages.includes(form.languageInput)) {
      setForm({
        ...form,
        languages: [...form.languages, form.languageInput],
        languageInput: '',
      });
    }
  };

  const removeLanguage = (index) => {
    const updated = [...form.languages];
    updated.splice(index, 1);
    setForm({ ...form, languages: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Profile:', form);
    // Dispatch or send to backend here
  };

  return (
    <div className="font-serif min-h-screen bg-white text-[#0078b8]">
      <MainHeader />
      <Navbar showSearch={false} />

      {/* Avatar & Edit */}
      <div className="w-full max-w-sm mx-auto flex flex-col gap-2 items-center pt-4">
        <label htmlFor="image-upload" className="cursor-pointer w-20 h-20 rounded-full p-6 text-sm border border-[#0078b8] hover:border-blue-500">
          <input id="image-upload" type="file" accept="image/*" className="hidden" />
        </label>
        <button className="text-sm underline text-[#0078b8]">Edit profile</button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 space-y-6">
        {/* About */}
        <div>
          <label className="block text-sm font-semibold mb-1">About me</label>
          <textarea
            name="about"
            className="w-full border border-[#0078b8] rounded-2xl p-3"
            rows="4"
            placeholder="Tell us about yourself"
            value={form.about}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Grid Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold">Name</label>
            <input name="name" value={form.name} onChange={handleInputChange} className="w-full border border-[#0078b8] rounded-2xl p-2" />
          </div>
          <div>
            <label className="text-sm font-semibold">Rate (/visit)</label>
            <input name="rate" value={form.rate} onChange={handleInputChange} className="w-full border border-[#0078b8] rounded-2xl p-2" />
          </div>

          <div>
            <label className="text-sm font-semibold">Years of Experience</label>
            <input name="experience" value={form.experience} onChange={handleInputChange} className="w-full border border-[#0078b8] rounded-2xl p-2" />
          </div>

          {/* Specializations Dropdown */}
          <div >
            <label className="text-sm font-semibold">Specialization</label>
            <div className="flex space-x-2">
              <input
                name="specialization"
                placeholder="e.g. Family Medicine"
                value={form.specialization}
                onChange={handleInputChange}
                className="w-full border border-[#0078b8] rounded-2xl p-2"
              />
              <button type="button" onClick={addSpecialization} className="bg-[#0078b8] text-white rounded px-4 text-sm">+</button>
            </div>
            <div className="mt-2 space-y-1">
              {form.specializations.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border border-[#0078b8] rounded px-2 py-1">
                  <span>{item}</span>
                  <button type="button" onClick={() => removeSpecialization(idx)} className="text-red-600">🗑</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">Institution of Graduation</label>
            <input name="institution" value={form.institution} onChange={handleInputChange} className="w-full border border-[#0078b8] rounded-2xl p-2" />
          </div>
          <div>
            <label className="text-sm font-semibold">Year of Graduation</label>
            <input name="graduationYear" value={form.graduationYear} onChange={handleInputChange} className="w-full border border-[#0078b8] rounded-2xl p-2" />
          </div>
          <div>
            <label className="text-sm font-semibold">Degree earned</label>
            <input name="degree" value={form.degree} onChange={handleInputChange} className="w-full border border-[#0078b8] rounded-2xl p-2" />
          </div>

          {/* Education List */}
          <div>
            <button type="button" onClick={addEducation} className="bg-[#0078b8] text-white rounded px-4 py-1 text-sm mt-6">Add new Specialization</button>
            <div className="mt-2 space-y-1">
              {form.educationList.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-center border border-[#0078b8] rounded px-2 py-1">
                  <span>{edu}</span>
                  <button type="button" onClick={() => removeEducation(idx)} className="text-red-600">🗑</button>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="text-sm font-semibold">Languages</label>
            <div className="flex space-x-2">
              <input
                name="languageInput"
                placeholder="e.g. English, Amharic"
                value={form.languageInput}
                onChange={(e) => setForm({ ...form, languageInput: e.target.value })}
                className="w-full border border-[#0078b8] rounded-2xl p-2"
              />
              <button type="button" onClick={addLanguage} className="bg-[#0078b8] text-white rounded px-4 text-sm">+</button>
            </div>
            <div className="mt-2 space-y-1">
              {form.languages.map((lang, idx) => (
                <div key={idx} className="flex justify-between items-center border border-[#0078b8] rounded px-2 py-1">
                  <span>{lang}</span>
                  <button type="button" onClick={() => removeLanguage(idx)} className="text-red-600">🗑</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center pt-6">
          <button type="submit" className="bg-[#11618b] text-white px-6 py-2 rounded-2xl w-full">
            Update Profile
          </button>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default EditProfilePage;