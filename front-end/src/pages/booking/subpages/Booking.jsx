import {useEffect, useState } from "react";
import Calendar from "../../../components/others/Calander";
import { useDate } from "../../../context/DateContext";
import axios from "axios";
import { useSelector } from "react-redux";
import MainHeader from "../../../components/layouts/MainHeader";
import Navbar from "../../../components/layouts/Navbar";
import { useNavigate } from "react-router-dom";
import pp from "../../../assets/avatar.svg"

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ethiopianBanks = [
  "Abay Bank",
  "Addis International Bank",
  "Amhara Bank",
  "Awash International Bank",
  "Bank of Abyssinia",
  "Berhan Bank",
  "Bunna International Bank",
  "Commercial Bank of Ethiopia",
  "Cooperative Bank of Oromia",
  "Dashen Bank",
  "Development Bank of Ethiopia",
  "Enat Bank",
  "Lion International Bank",
  "National Bank of Ethiopia",
  "Nib International Bank",
  "Oromia International Bank",
  "Tsehay Bank",
  "Wegagen Bank",
  "Zemen Bank",
];

const periods = {
  1: "03:00 - 03:45",
  2: "03:45 - 04:30",
  3: "04:30 - 05:15",
  4: "05:15 - 08:00",
  5: "08:00 - 08:45",
  6: "08:45 - 09:30",
  7: "09:30 - 10:15",
  8: "10:15 - 11:00",
};

const period_start = {
  1: "03:00:00",
  2: "03:45:00",
  3: "04:30:00",
  4: "05:15:00",
  5: "08:00:00",
  6: "08:45:00",
  7: "09:30:00",
  8: "10:15:00",
};

const Booking = ({doctorId}) => {
  const { selectedDate } = useDate();
  const [curr_idx, setidx] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [currbank, setBank] = useState(0);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [occupied, setOccupied] = useState(new Set());
  const navigate = useNavigate();
  const [currSlot, setCurrSlot] = useState(null);
  const user_id = useSelector((state) => state.auth.userId);

  const [symptoms, setSymptoms] = useState("new");
const getOccupiedSlots = (appointments, date) => {
  if (!date || typeof date.format !== 'function') {
    console.error("Invalid or null date passed to getOccupiedSlots", date);
    return new Set();
  }

  const dateStr = date.format("YYYY-MM-DD");
  console.log("Getting occupied slots for:", dateStr);
  console.log("days",appointments)
  const matchingAppointments = appointments.filter(
    (a) => a.appointmentDate === dateStr
  );

  console.log("Matching appointments:", matchingAppointments);

  const set = new Set();

  matchingAppointments.forEach((a) => {
    const slotKey = Object.entries(period_start).find(
      ([key, value]) => value === a.appointmentTime
    );
    console.log("Checking time:", a.appointmentTime, "-> slotKey:", slotKey);
    if (slotKey) {
      set.add(Number(slotKey[0]) - 1); // adjust index to match button index
    }
  });

  console.log("Occupied set:", set);
  return set;
};
  useEffect(() => {
  if (appointments.length && selectedDate) {
    const occupiedSet = getOccupiedSlots(appointments, selectedDate);
    setOccupied(occupiedSet);
  }
}, [appointments, selectedDate]);



  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const [profileRes, appointmentsRes] = await Promise.all([
          axios.get(`${BASE_URL}/doctor/${doctorId}`),
          axios.get(`${BASE_URL}/doctor/${doctorId}/UpcomingAppointments`),
        ]);

        const doctorData = profileRes.data.docter;
        const upcomingAppointments = appointmentsRes.data.data;
        setDoctor({
          id: doctorData.doctor_id,
          profile_picture: `${BASE_URL}/storage/${doctorData.image}`,
          name: `Dr. ${doctorData.fullName}`,
          work: doctorData.aboutMe,
          payment: `${doctorData.pricing} ETB per session`,
          pricing: doctorData.pricing,
        });

        setAppointments(upcomingAppointments);

      } catch (err) {
        console.error("Error fetching doctor data:", err);
      }
    };

    fetchDoctorData();
  }, [selectedDate]);

  const handleer = (idx) => {
    setidx(idx);
    setCurrSlot(idx );
    console.log(idx,9999999)
  };
const onSubmit = async () => {
  if (currSlot === null) return alert("Please select a time slot");

  const now = new Date();
  const selectedDateTime = selectedDate.toDate();

  // Combine selectedDate with selected period time
  const [hours, minutes, seconds] = period_start[currSlot + 1].split(":").map(Number);
  selectedDateTime.setHours(hours);
  selectedDateTime.setMinutes(minutes);
  selectedDateTime.setSeconds(seconds);

  if (selectedDateTime < now) {
    return alert("You cannot book a past time slot.");
  }

  try {
    const dateStr = selectedDate.format("YYYY-MM-DD");
    await axios.post(BASE_URL + `/setAppointment`, {
      doctor_id: doctorId,
      patient_id: user_id,
      symptoms: symptoms,
      appointmentDate: dateStr,
      appointmentTime: period_start[currSlot + 1],
      price: doctor.pricing,
      statusAppointment: "confirmed",
    });

    alert("Appointment booked!");
    const res = await axios.get(
      BASE_URL + `/doctor/${doctorId}/UpcomingAppointments`
    );
    setAppointments(res.data.data);

    setOccupied(getOccupiedSlots(res.data.data, selectedDate));
    navigate("/dashboard")
  } catch (err) {
    alert("Booking failed: " + (err.response?.data?.message || err.message));
  }
};



  const addDay = (day) => {
    const updatedOccupied = getOccupiedSlots(appointments, day);
    setOccupied(updatedOccupied);
  };

  return (
 <>     
      <MainHeader />
      <Navbar />

      <div className="md:flex justify-between p-5 px-20 font-Lora text-[black]">
        <div className="md:basis-7/12 py-8 px-4 bg-[#E1F5F5] rounded-lg">
          <div className="">
            <div className="flex gap-4 py-2 border-b-2 border-[#2A6F97]">
              <img
                src={pp}
                alt="profile"
                className="rounded-full h-10"
              />
              <div className="content-center ">
                <h1 className="pb-1">{doctor?.name}</h1>
                <p>{doctor?.work}</p>
              </div>
            </div>
            <div className="mt-10 w-full">
              <p className="text-center mb-5 text-2xl font-bold">
                Enter Symptoms
              </p>
              <div className="px-15">
                <input
                  type="text"
                  className="h-10 w-full py-2 border-2 border-[#2A6F97] pl-1 rounded-lg bg-white"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="mt-10 text-2xl font-bold">Payment Method</div>
            <div className="grid grid-cols-12 justify-around gap-2 mt-10">
              <div className="col-span-8 h-40 flex flex-col rounded-2xl py-5 bg-[#D0EEEE] px-5">
                <div className="bg-white flex flex-col rounded-2xl justify-around h-full pl-5">
                  <div>
                    <label htmlFor="bank"> Choose Bank </label>
                    <select
                      name="bank"
                      id="bank"
                      className="ml-2"
                      onChange={(e) => setBank(e.target.selectedIndex)}
                    >
                      {ethiopianBanks.map((bank, index) => (
                        <option key={index} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="card">Card </label>
                    <input
                      type="text"
                      id="card"
                      name="card"
                      className="ml-2 border-2 border-black pl-1"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex col-span-4 justify-center items-end pt-20 px-10">
                <div className="flex flex-col justify-between h-full w-full text-center">
                  <p>{doctor?.payment}</p>
                  <button
                    className="px-3 h-10 bg-[#2A6F97] rounded-xl"
                    onClick={onSubmit}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:basis-4/12 bg-[#E1F5F5] rounded-lg flex flex-col justify-start">
          <div className="scale-80 origin-top" style={{ zoom: "0.8" }}>
            <Calendar onAction={addDay} />
          </div>
          <div className="bg-white mx-10 h-30 overflow-auto rounded-lg p-2">
            {selectedDate ? (
              occupied.size < 8 ? (
                Object.entries(periods)
                  .filter(([ind]) => !occupied.has(Number(ind) - 1))
                  .map(([ind, value]) => {
                    const index = Number(ind) - 1;
                    return (
                      <button
                        className={
                          "shadow-lg rounded-xs m-1 mx-3 px-1 " +
                          (curr_idx === index ? "bg-blue-400" : "bg-white")
                        }
                        onClick={() => handleer(index)}
                        key={index}
                      >
                        {value}
                      </button>
                    );
                  })

              ) : (
                <div className="font-bold text-center p-1">
                  Check another day — fully booked!
                </div>
              )
            ) : (
              <div className="font-bold text-center p-1">
                First select a day to see available time
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;