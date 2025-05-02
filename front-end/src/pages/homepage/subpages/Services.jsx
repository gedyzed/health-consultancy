import { useState } from "react";
import Card from "../../../components/cards/Card";
import {
  FaSearch,
  FaCommentDots,
  FaCalendarCheck,
  FaStar,
  FaMobileAlt,
} from "react-icons/fa";

const Services = () => {
  const [cardData] = useState([
    {
      Icon: FaSearch,
      title: "Find Specialist",
      content:
        "Quickly search for the right healthcare professional based on your needs, specialty, availability, and reviews.",
    },
    {
      Icon: FaCalendarCheck,
      title: "Book Appointments",
      content:
        "Easily schedule consultations at your preferred time with just a few clicks.",
    },
    {
      Icon: FaCommentDots,
      title: "Message Your Consultant",
      content:
        "Send messages to your doctor for quick follow-ups, questions, or updates.",
    },
    {
      Icon: FaStar,
      title: "Reviews & Ratings",
      content:
        "Read what other patients have to say, and share your own experiences to help others.",
    },
    {
      Icon: FaMobileAlt,
      title: "Access Anywhere, Anytime",
      content:
        "Use the platform from your phone, tablet, or computer — always responsive and mobile-friendly.",
    },
  ]);

  return (
    <div className="flex flex-col pb-30 px-10">
      <h1 className="text-center py-10 text-[#023E8A] font-bold text-4xl">
        Why Choose Us
      </h1>
      <div className="flex flex-wrap gap-5 pt-20 justify-center">
        {cardData.map((card, index) => (
          <Card
            key={index}
            Icon={card.Icon}
            title={card.title}
            content={card.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
