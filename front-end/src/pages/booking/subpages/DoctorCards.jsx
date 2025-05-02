import { useState } from "react";
import DoctorCard from "../../../components/cards/DoctorCard";
import { HiChevronDoubleDown, HiChevronDoubleUp } from "react-icons/hi";

const DoctorCards = () => {
    const doctors = Array(10).fill({
        name: "Dr. Jane",
        title: "Primary Care Doctor",
        rating: "4.6/5",
      });

      const [showAll, setShowAll] = useState(false);
      const visibleDoctors = showAll ? doctors : doctors.slice(0, 5);

    return (
        <div>
            <h2 className="text-xl font-semibold text-center pb-3">Doctors in this Field</h2>
            <div className="flex flex-wrap gap-6 items-center justify-center">
                {visibleDoctors.map((doc, idx) => (
                    <DoctorCard
                        key={idx}
                        name={doc.name}
                        title={doc.title}
                        rating={doc.rating}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="btn btn-outline btn-sm mt-4"
                >
                    {showAll ? (
                        <>
                            <HiChevronDoubleUp className="text-2xl" />
                            Show Less
                        </>
                    ) : (
                        <>
                            <HiChevronDoubleDown className="text-2xl" />
                            See More
                        </>
                    )}
                </button>
            </div>

        </div>
    )
}

export default DoctorCards
