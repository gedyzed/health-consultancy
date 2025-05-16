import derma from '../../../assets/patient/images/derma.png';
import gynecology from '../../../assets/patient/images/gyn.png';
import nutrition from '../../../assets/patient/images/nutrition.png';
import Orthopedic from '../../../assets/patient/images/Orthopedic.png';
import Pediatrician from '../../../assets/patient/images/Pediatrician.png';
import vision from '../../../assets/patient/images/vision.png';
import { Link } from 'react-router-dom';


const TopSearchedSpecialty = () => {

  const specialties = [
    { title: "Dermatology", image: derma },
    { title: "Orthopedic", image: Orthopedic },
    { title: "Pediatrician", image: Pediatrician },
    { title: "OB_GYN", image: gynecology},
    { title: "Nutrition", image: nutrition },
    { title: "Vision", image: vision },
  ];

  return (
    <div className=" rounded-lg p-4 bg-blue-50 mb-10">
      <h3 className="text-xl font-semibold mb-4">Top Searched Specialty</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {specialties.map((item, index) => (
          <Link to={`/specialization/${item.title}/doctorsList`} key={index} className="card bg-base-100 w-48 shadow-sm flex-shrink-0">
            <figure className="px-4 pt-4">
              <img
                src={item.image}
                alt={item.title}
                className="rounded-xl h-32 object-cover"
              />
            </figure>
            <div className="card-body items-center text-center py-4">
              <h2 className="card-title text-base">{item.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopSearchedSpecialty
