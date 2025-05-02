import eye_surgery from '../../../assets/patient/images/eye_surgery.png';

const DailyHealthTips = () => {
  const daily = [
    {
      question: "Do Carrots Improve Night Vision?",
      answer:
        "Not exactly. The popular belief began as WWII propaganda to conceal radar use. Carrots are rich in vitamin A, which supports eye health – but they won’t enhance your night vision. A balanced diet is key to maintaining good eyesight.",
      image: eye_surgery, 
    },
  ];

  return (
    <div className="p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Daily Health Tips</h2>
      {daily.map((tip, index) => (
        <div
          key={index}
          className="flex bg-blue-100 rounded-lg p-4 gap-4 items-center"
        >
          <img
            src={tip.image}
            alt="Health Tip"
            className="w-40 h-28 object-cover rounded-md shadow"
          />
          <div className="text-sm text-center text-gray-700 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">{tip.question}</h3>
            <p>{tip.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyHealthTips;
