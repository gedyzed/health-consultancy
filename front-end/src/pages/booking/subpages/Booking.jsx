import data from "./Doctors";
import Calendar from "../../../components/others/Calander";
import { useState, createContext } from "react";
import { useDate } from "../Context/DateContext";
const doctorprofile = data.doctorprofile;
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
  1: "3:00 - 3:45",
  2: "3:45 - 4:30",
  3: "4:30 - 5:15",
  4: "5:15 - 8:00",
  5: "8:00 - 8:45",
  6: "8:45 - 9:30",
  7: "9:30 - 10:15",
  8: "10:15 - 11:00",
};

const occupied = new Set();

const Booking = () => {
  const { selectedDate } = useDate();
  const [curr_idx, setidx] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [currbank, setBank] = useState(0);
  const handleer = (idx) => {
    const userContext = createContext();
    setidx(idx);
  };
  const onSubmit = () => {
    if (curr_idx === null) {
      alert("Please select a time slot before booking.");
      return;
    }
    if (cardNumber.trim() === "") {
      alert("Please enter your card number.");
      return;
    }
    // alert("this is time" + currbank+" this day"+selectedDate.format('DD-MM-YYYY')+cardNumber); send to back end
  };
  const addDay = (day) => {
    day = day.format("YYYY-MM-DD");
    occupied.clear();
    if (doctorprofile["non-availabTime"][day]) {
      doctorprofile["non-availabTime"][day].forEach((element) => {
        occupied.add(element);
      });
    }
  };

  return (
    <>
      <div className="md:flex justify-between p-5 px-20 font-Lora text-[black]">
        <div className="md:basis-7/12 py-8 px-4 bg-[#E1F5F5]  rounded-lg">
          <div className="">
            <div className="flex gap-4  py-2 border-b-2  border-[#2A6F97]">
              <img
                src={doctorprofile["profile_picture"]}
                alt="profile"
                className="rounded-full h-10"
              />
              <div className="content-center ">
                <h1 className="pb-1">{doctorprofile["name"]}</h1>
                <p>{doctorprofile["work"]}</p>
              </div>
            </div>
            <div className=" mt-10 w-full ">
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
            <div className="mt-10  text-2xl font-bold">Payment Method</div>
            <div className="grid grid-cols-12 justify-around gap-2 mt-10 ">
              <div className="col-span-8  h-40 flex flex-col rounded-2xl py-5 bg-[#D0EEEE] px-5">
                <div className=" bg-white flex flex-col rounded-2xl justify-around h-full pl-5">
                  {" "}
                  <div>
                    <label htmlFor="cars"> Choose Bank </label>
                    <select name="cars" id="cars" className="ml-2">
                      {ethiopianBanks.map((bank, index) => (
                        <option
                          key={index}
                          onChange={() => setBank(index)}
                          value={bank}
                        >
                          {bank}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {" "}
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
              <div className="flex  col-span-4   justify-center items-end pt-20 px-10 ">
                <div className="flex flex-col justify-between  h-full w-full text-center">
                  <p>{doctorprofile["payment"]}</p>
                  <button
                    className="px-3 h-10 bg-[#2A6F97] rounded-xl"
                    // {}
                    onClick={onSubmit}
                  >
                    book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:basis-4/12 bg-[#E1F5F5]  rounded-lg flex flex-col justify-start ">
          <div className=" scale-80 origin-top" style={{ zoom: "0.8" }}>
            <Calendar onAction={addDay} />
          </div>

          <div className="bg-white mx-10 h-30 overflow-auto rounded-lg p-2">
            {selectedDate ? (
              occupied.size < 8 ? (
                Object.entries(periods)
                  .filter(([ind]) => !occupied.has(ind - 1))
                  .map(([ind, value]) => (
                    <button
                      className={
                        "shadow-lg rounded-xs m-1 mx-3 px-1 " +
                        (curr_idx == ind - 1 ? "bg-blue-400" : "bg-white")
                      }
                      onClick={() => handleer(ind - 1)}
                      key={ind - 1}
                    >
                      {value}
                    </button>
                  ))
              ) : (
                <div ssName="font-bold text-center p-1">
                  {" "}
                  check out another day this day is fully occupied
                </div>
              )
            ) : (
              <div className="font-bold text-center p-1">
                Fisrt Select Day To See The Avaliable time{selectedDate}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
