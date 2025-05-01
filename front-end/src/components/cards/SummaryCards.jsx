
  
  
  const data = [
    { title: "Reviews", value: 100 },
    { title: "Rating", value: 4.8 },
    { title: "Next Appointment", value: "20, 05, 2015" },
  ];
  
  export default function SummaryCards() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-dark-900">
        {data.map((card, index) => (
          <div
            key={index}
            className="bg-blue-100 p-4 rounded-box text-center hover:shadow-lg transition duration-300 ease-in-out"
          >
            <h2 className="text-xl font-bold">{card.title}</h2>
            <p className="text-lg">{card.value}</p>
          </div>
        ))}
      </div>
    );
  }
  