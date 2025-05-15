import React, { useState } from 'react';
import MainHeader from '../../../components/layouts/MainHeader';
import Navbar from '../../../components/layouts/Navbar';
import Footer from '../../../components/layouts/Footer';
import { useDispatch } from 'react-redux';
import { submitDoctorProfile } from '../../../features/doctors/doctorsProfileApi';


const EditProfilePage = () => {

  const dispatch = useDispatch()

  const [form, setForm] = useState({
    name: '',
    rate: '',
    profileImage: null,
    profileImagePreview: '',
    experience: '',
    specialization: '',
    specializations: [],
    educationList: [],
    languages: [],
    languageInput: '',
    about: '',
    certifications: [],
    certificationInput: '',
  });


  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        profileImage: {
          file,
          preview: URL.createObjectURL(file),
        },
      }));
    }
  };

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

  const handleAddEducation = () => {
    const parts = form.degreeInput.split(',').map((part) => part.trim());

    if (parts.length === 3) {
      const [degree, institution, year] = parts;

      const newEducation = {
        degree,
        institution,
        year,
      };

      setForm((prevForm) => ({
        ...prevForm,
        educationList: [...prevForm.educationList, newEducation],
        degreeInput: '',
      }));
    } else {
      alert('Please enter in the format: Degree, Institution, Year');
    }
  };

  const handleRemoveEducation = (index) => {
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

  const handleAddCertification = () => {
    if (
      form.certificationInput &&
      !form.certifications.includes(form.certificationInput)
    ) {
      setForm((prevForm) => ({
        ...prevForm,
        certifications: [...prevForm.certifications, prevForm.certificationInput],
        certificationInput: '',
      }));
    }
  };

  const handleRemoveCertification = (index) => {
    setForm((prevForm) => {
      const updated = [...prevForm.certifications];
      updated.splice(index, 1);
      return { ...prevForm, certifications: updated };
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(submitDoctorProfile({
    form,
    doctorId: 3, 

  }));

    console.log('Submitted Profile:', form);
    setForm({
    name: '',
    rate: '',
    profileImage: null,
    profileImagePreview: '',
    experience: '',
    specialization: '',
    specializations: [],
    educationList: [],
    languages: [],
    languageInput: '',
    about: '',
    certifications: [],
    certificationInput: '',
  })
  };

  return (
    <div className="font-serif min-h-screen bg-white text-[#0078b8]">
      <MainHeader />
      <Navbar showSearch={false} />

      {/* Avatar & Edit */}
      <div className="w-full max-w-sm mx-auto flex flex-col gap-2 items-center pt-4">
        <label htmlFor="image-upload" className="cursor-pointer w-20 h-20 rounded-full overflow-hidden border border-[#0078b8] hover:border-blue-500">
          {form.profileImagePreview ? (
            <img src={form.profileImagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-[#0078b8]">Upload</div>
          )}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImageChange}
          />
        </label>

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

          {/* Degrees Input (Comma-separated) */}
          <div className="mt-2 space-y-1">
            <label className="text-sm font-semibold">Degree (Degree, Institution, Year)</label>
            <div className="flex space-x-2">
              <input
                name="degreeInput"
                placeholder="e.g. MD, Harvard University, 2020"
                value={form.degreeInput}
                onChange={(e) => setForm({ ...form, degreeInput: e.target.value })}
                className="w-full border border-[#0078b8] rounded-2xl p-2"
              />
              <button
                type="button"
                onClick={handleAddEducation}
                className="bg-[#0078b8] text-white rounded px-4 text-sm"
              >
                +
              </button>
            </div>

            <div className="mt-2 space-y-1">
              {form.educationList.map((edu, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border border-[#0078b8] rounded px-2 py-1"
                >
                  <span>{edu.degree} — {edu.institution} ({edu.year})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(idx)}
                    className="text-red-600"
                  >
                    🗑
                  </button>
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

        <div className="mt-2 space-y-1">
          <label className="text-sm font-semibold">Certifications</label>
          <div className="flex space-x-2">
            <input
              name="certificationInput"
              placeholder="e.g. Board Certified in Internal Medicine"
              value={form.certificationInput}
              onChange={(e) => setForm({ ...form, certificationInput: e.target.value })}
              className="w-full border border-[#0078b8] rounded-2xl p-2"
            />
            <button
              type="button"
              onClick={handleAddCertification}
              className="bg-[#0078b8] text-white rounded px-4 text-sm"
            >
              +
            </button>
          </div>

          <div className="mt-2 space-y-1">
            {form.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border border-[#0078b8] rounded px-2 py-1"
              >
                <span>{cert}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCertification(idx)}
                  className="text-red-600"
                >
                  🗑
                </button>
              </div>
            ))}
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