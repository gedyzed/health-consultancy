import { useEffect, useState } from "react";
import data from "./booking/subpages/Doctors";
const doctor = data.doctor;
const Chat = () => {
  const [names, setNames] = useState([]);
  const [currChat, setChat] = useState(false);

  useEffect(() => {
    setNames(doctor);
  }, []);

  



  return (
    <div className=" font-Lora bg-white">
      <div className="grid sm:grid-cols-12  mt-5">
        <div className="sm:col-span-4 ">
          <div className="  flex mb-2 sm:px-4 pl-7 pr-10  ">
            <input
              type="text"
              className=" border-[#023E8A]  border-2 h-10 w-full  pl-10 rounded-lg "
            />
            <img
              src="./Home%20page/Icone/search1.svg"
              className="absolute left-10 sm:left-7 h-6 my-3 pb-1"
            />
          </div>

          <div className="sm:px-5  max-h-[500px] sm:overflow-y-auto pr-10 pl-7 ">
            {names.map((c) => (
              <button onClick={()=> setChat(true)} className="border-1  border-[#023E8A]  block w-full my-1 h-12 rounded-lg text-black text-lg text-left pl-10 pr-2 overflow-x-hidden">
                {c.name}
              </button>
            ))}
          </div>
          <div></div>
        </div>
        {currChat?(<div className="hidden sm:inline sm:col-span-8 md:flex flex-col justify-between">
           <div className="relative ">
            <div className="  border border-[#023E8A] rounded-lg  px-10 mx-10 h-12 bg-white">
              <div className="pt-3">{}</div>
                <div>
                  <img
                    src="./extraimg/camera-video.svg"
                    className="absolute top-3 right-15 h-7"
                  />
                </div>
              </div>
            </div>

            <div className="px-10 relative  mt-100 ">
              <input
                type="text "
                className="pl-1 pr-15 mx-auto my-10  w-full border border-[#023E8A] rounded-lg  h-10"
              />
              <img
                src="./extraimg/image.png"
                className="absolute top-1/2 right-13  h-7 -translate-y-3"
              />
            </div>
          </div>): <div className="flex justify-center items-center col-span-8 text-[#023E8A]"> Select Chat to See Conversation</div>}
      </div>
    </div>
  );
};

export default Chat;
