import { useState } from "react";
import { FaArrowLeft, FaSearch, FaEnvelope } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import Review from "../../../components/others/Review";
import pp from "../../../assets/home_page/images/jane_cooper.jpg";

const ProfileView = () => {

  
  const [showForm, setShowForm] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  
  const [doctorName] = useState("Dr. Jane Doe");
  const [title] = useState("Primary Care Doctor");
  const [rating] = useState("⭐ 4.8 (200 reviews)");

  const [contactEmail] = useState("janedoe@gmail.com");
  const [languages] = useState(["ENG", "AMH"]);
  const [fee] = useState("300 ETB/session");

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    setReviews((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: "Anonymous",    
        date: today,
        message: newReviewText.trim(),
      },
    ]);
    setNewReviewText("");
    setShowForm(false);
  };

  const [specializations] = useState([
    "Family Medicine",
    "Mental Health & Counselling",
    "Women's Health",
  ]);

  const [education] = useState([
    "MD, Addis Ababa University, 2017",
    "Diploma in Mental Health Counselling, Univ. of Michigan, 2021",
  ]);

  const [aboutText] = useState(
    `Dr. Jane Doe is a compassionate and highly skilled primary care physician
     with over 8 years of experience. She believes in building strong patient
     relationships and using a holistic approach to healthcare. Fluent in English
     and Amharic, she works to ensure every patient feels heard, supported, and informed.`
  );

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Mahlet Tefera",
      date: "March 5, 2025",
      message:
        "Dr. Jane is one of the kindest doctors I've ever met. She listened carefully and explained everything in a way I could understand. Highly recommended!",
    },
    {
      id: 2,
      name: "Mahlet Tefera",
      date: "March 5, 2025",
      message:
        "Dr. Jane is one of the kindest doctors I've ever met. She listened carefully and explained everything in a way I could understand. Highly recommended!",
    },
    {
      id: 3,
      name: "Mahlet Tefera",
      date: "March 5, 2025",
      message:
        "Dr. Jane is one of the kindest doctors I've ever met. She listened carefully and explained everything in a way I could understand. Highly recommended!",
    },
    
  ]);

  const addReview = (newReview) => {
    setReviews((prev) => [...prev, { id: prev.length + 1, ...newReview }]);
  };

  return (
    <div className="flex flex-col w-full p-10 px-50 gap-2">
      <div>
        <FaArrowLeft />
      </div>

      <div className="relative bg-[#289FF3] h-32 w-full rounded-lg">
        <div className="absolute top-20 left-70">
          <img
            src={pp}
            alt={doctorName}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>

      <div className="mt-16 text-center">
        <h1 className="text-2xl font-semibold">{doctorName}</h1>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-sm text-gray-600 mt-1">{rating}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-6 py-8">
        <div className="flex-1 p-4 bg-white shadow rounded-lg">
          <div className="mb-4 flex items-start gap-3">
            <FaEnvelope className="text-blue-500 mt-1" />
            <div>
              <p className="font-semibold text-sm">{contactEmail}</p>
            </div>
          </div>
          <div className="mb-4 flex items-start gap-3">
            <MdLanguage className="text-blue-500 mt-1" />
            <div>
              <p className="font-bold text-sm">Languages Spoken:</p>
              <p className="text-sm">{languages.join(", ")}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaSearch className="text-blue-500 mt-1" />
            <div>
              <p className="font-bold text-sm">Consultation Fee:</p>
              <p className="text-sm">{fee}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 bg-white shadow rounded-lg">
          <p className="text-md font-bold mb-2">Specialization</p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {specializations.map((spec, idx) => (
              <li key={idx}>{spec}</li>
            ))}
          </ul>
        </div>

      
        <div className="flex-1 p-4 bg-white shadow rounded-lg">
          <p className="text-md font-bold mb-2">Education & Certifications</p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {education.map((ed, idx) => (
              <li key={idx}>{ed}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-6 pb-4">
        <h2 className="text-md font-bold mb-2">About {doctorName}</h2>
        <p className="text-gray-700 text-md leading-relaxed">{aboutText}</p>
      </div>

      <div className="mx-6 mb-6">
        <div className="rounded-lg p-4">
          <h2 className="text-md font-bold mb-3">Reviews</h2>


          <div className="max-h-60 overflow-y-auto space-y-4 pr-2">
            {reviews.map((r) => (
              <Review
                key={r.id}
                pp={pp}
                name={r.name}
                date={r.date}
                message={r.message}
              />
            ))}
          </div>

          <hr className="my-4 border-gray-900" />

          <p className="text-sm text-gray-z00">
            Had a session with Dr. Jane? Share your experience!
          </p>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="mt-2 bg-white border border-blue-400 text-blue-500 px-4 py-1 rounded-md shadow-sm hover:bg-blue-50"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>

          {showForm && (
            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-2">
              <textarea
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                rows={4}
                placeholder="Write your review here…"
                className="w-full border rounded-md p-2 text-sm focus:outline-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
