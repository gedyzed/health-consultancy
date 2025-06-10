import { useState, useEffect } from "react";
import MainHeader from "../../../components/layouts/MainHeader";
import Navbar from "../../../components/layouts/Navbar";
import { submitPatientProfile } from "../../../features/profile/patientProfileSetAPI";
import { useDispatch, useSelector } from "react-redux";

export default function PatientSetProfile() {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.auth.userId);

  const [form, setForm] = useState({
    name: "",
    gender: "",
    about: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user_id) {
      alert("User ID is not available. Please log in again.");
      return;
    }

    if (!form.name || !form.gender || !form.about) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("patient_id", user_id);
    formData.append("fullName", form.name);
    formData.append("gender", form.gender);
    formData.append("aboutMe", form.about);
    // if (form.profileImage) formData.append("image", form.profileImage); 

    try {
      await dispatch(submitPatientProfile(formData)).unwrap();
      alert("Profile submitted successfully!");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.data); // Laravel validation errors
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const imagePreview = form.profileImage ? URL.createObjectURL(form.profileImage) : null;

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <div>
      <MainHeader />
      <Navbar />

      <div className="font-serif min-h-screen flex items-center justify-center bg-base-100 px-4">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl w-full space-y-6">
          <h2 className="text-2xl font-bold text-center text-shadow-blue-500">Set your personal profile</h2>

          {errors && (
            <div className="text-red-600 text-sm">
              {Object.entries(errors).map(([field, messages]) => (
                <p key={field}>{field}: {messages[0]}</p>
              ))}
            </div>
          )}

          <div className="w-full max-w-sm mx-auto flex flex-col gap-2 items-center pt-4">
            <label
              htmlFor="image-upload"
              className="cursor-pointer w-20 h-20 rounded-full overflow-hidden border border-[#0078b8] hover:border-blue-500"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-[#0078b8]">
                  Upload
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

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

          <div className="grid grid-cols-2 gap-4 pt-6">
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full border border-[#0078b8] rounded-2xl p-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="gender" className="block text-sm font-semibold mb-2 text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full border border-[#0078b8] rounded-xl p-2 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 ease-in-out text-gray-800"
                value={form.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer bg-[#0078b8] w-full rounded-2xl text-center p-3 text-white"
          >
            Set Profile
          </button>
        </form>
      </div>
    </div>
  );
}
