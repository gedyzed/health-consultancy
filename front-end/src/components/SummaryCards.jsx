export default function SummaryCards  () {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-dark-900 ">
      <div className=" bg-blue-100 p-4 rounded-box text-center">
        <h2 className="text-xl font-bold">Reviews</h2>
        <p className="text-lg">100</p>
      </div>
      <div className="bg-blue-100 p-4 rounded-box text-center">
        <h2 className="text-xl font-bold">Rating</h2>
        <p className="text-lg">4.8</p>
      </div>
      <div className="bg-blue-100 p-4 rounded-box text-center">
        <h2 className="text-xl font-bold">Next Appointment</h2>
        <p className="text-lg">20, 05, 2015</p>
      </div>

    </div>
  );
};


