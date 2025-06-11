import { useSelector } from "react-redux";
import Navbar from "../../../components/layouts/Navbar";
import pp from "../../../assets/avatar.svg";

const ProfileView = () => {
  const profile = useSelector((state) => state.patient.patient);
  const { fullName, gender, aboutMe } = profile;

  return (
    <div className="container pt-2">
      <Navbar />

      <div className="flex flex-col w-full p-10 gap-6">
        <div className="relative bg-[#289FF3] h-32 w-full rounded-lg">
          <div className="absolute top-20 left-70">
            <img
              src={pp}
              alt={fullName}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <h1 className="text-2xl font-semibold">{fullName}</h1>
          <p className="text-sm text-gray-600">{gender}</p>
        </div>

        <div className="px-6 pb-4">
          <h2 className="text-md font-bold mb-2">About {fullName}</h2>
          <p className="text-gray-700 text-md leading-relaxed">{aboutMe}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
