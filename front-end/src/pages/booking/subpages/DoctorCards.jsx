import { useState } from "react";
import DoctorCard from "../../../components/cards/DoctorCard";
import { HiChevronDoubleDown, HiChevronDoubleUp } from "react-icons/hi";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpecializedDoctors } from "../../../features/booking/bookingSliceApi"
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { setDoctors, setId } from "../../../features/booking/bookingSliceApi";


const DoctorCards = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const title  = params.name;
    const navigate = useNavigate();

    // const doctors = useSelector(state => state.booking.doctors);
    
    useEffect(() => {

         const init = async () => {

              if (!title){
                navigate("/dashboard")
                return; 
              }
        
              try{
                const resultAction = await dispatch(getUserToken(targetDoctor.id))
                const { doctors } = unwrapResult(resultAction);
        
                if(!doctors){
                    navigate("/dashboard")
                  return; 
        
                }
                dispatch(setDoctors(doctors));
              }
              catch(err) {
                console.log("Failed to fetch doctors", err)
                navigate("/dashboard")
              } 
            }
            init();

    }, [title])

   


    const doctors = Array(12).fill({
        name: "Dr. Jane",
        title: "Primary Care Doctor",
        rating: "4.6/5",
      });
    
      const [showAll, setShowAll] = useState(false);
      const visibleDoctors = showAll ? doctors : doctors.slice(0, 5);

    return (
        <div>
            <h2 className="text-xl font-semibold text-center py-5">Doctors in this Field</h2>
            <div className="flex flex-wrap gap-6 items-center justify-center">
                {visibleDoctors.map((doc, idx) => (
                    <DoctorCard key={doc.doctor_id} doctor={doc}/>
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
