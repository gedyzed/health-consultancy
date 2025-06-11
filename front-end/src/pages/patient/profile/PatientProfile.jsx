import { useSelector } from "react-redux";
import Navbar from "../../../components/layouts/Navbar";
import pp from "../../../assets/avatar.svg";

const ProfileView = () => {
  const profile = useSelector((state) => state.patient.patient);
  const { fullName, gender, aboutMe } = profile;

  return (
    <div className="container pt-2 mx-auto">
      <Navbar />

      <div className="flex flex-col items-center w-full px-4 py-10 gap-6">
        {/* Banner Section */}
        <div className="relative bg-[#289FF3] h-32 w-full rounded-lg">
          {/* Profile Image */}
          <div className="absolute inset-x-0 top-20 flex justify-center">
            <img
              src={pp}
              alt={fullName}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>

        {/* Name & Gender */}
        <div className="mt-20 text-center">
          <h1 className="text-2xl font-semibold">{fullName}</h1>
          <p className="text-sm text-gray-600 capitalize">{gender}</p>
        </div>

        {/* About Section */}
        <section className="w-full max-w-2xl bg-white rounded-lg shadow-md px-6 py-4">
          <h2 className="text-lg font-bold mb-2">About {fullName}</h2>
          <p className="text-gray-700 text-md leading-relaxed">{aboutMe}</p>
        </section>
      </div>
    </div>
  );
};

export default ProfileView;
