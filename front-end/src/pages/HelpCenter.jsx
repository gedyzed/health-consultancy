import React, { useState } from "react";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import MainHeader from "../components/layout/MainHeader";
import logo from "../assets/logo.svg"


const HelpCenter = () => {
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is this platform for? ",
      answer:
        "This platform allows users to consult with licensed health professionals online for medical advice and guidance.",
    },
    { question: "What services do you offer?" },
    { question: "What payment methods do you accept?" },
    { question: "Can I trust the information given here?" },
    { question: "How do I book a consultation?" },
    { question: "Are the consultations in real-time?" },
    { question: "Can I cancel or reschedule an appointment?" },
    { question: "Will I get a refund if I cancel?" },
    { question: "Is my personal health information safe?" },
  ];

  return (
    <div>
        <MainHeader/>
        <Navbar/>
    <div className="p-6 md:flex md:space-x-6 font-serif">
      
      {/* Left Section */}
      <div className="md:w-2/3">
        <h1 className="text-2xl font-semibold mb-4">Help Center</h1>

        <p className="mb-2 font-medium">Quick Walkthrough</p>

        <h2 className="text-lg font-semibold">Sign Up or Log In</h2>
        <p className="mb-4 text-sm">
          Create an account using your email and basic information. If you're already registered,
          simply log in to your dashboard.
        </p>

        <h2 className="text-lg font-semibold">Choose a Health Professional</h2>
        <p className="mb-4 text-sm">
          Browse through a list of available doctors or health consultants based on specialty (e.g., general
          medicine, mental health, nutrition).
        </p>

        <h2 className="text-lg font-semibold">Book a Consultation</h2>
        <p className="mb-8 text-sm">
          Select a date and time that works for you, then confirm your appointment. You’ll receive a reminder
          before the session.
        </p>

        <p className="text-center font-medium">Need More Help?</p>
        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
<div className="bg-blue-50 rounded p-4 mt-4 rounded-2xl relative overflow-visible">
  <img
    src={logo}
    className="w-30 h-30 absolute top-1/17 right-[40px] transform -translate-y-1/2 z-20"
    alt="Logo"
  />
  <form className="flex flex-col space-y-3">
    <input
      type="text"
      placeholder="Name"
      className="border-b border-gray-600 w-3/4 bg-transparent focus:outline-none focus:border-blue-500"
    />
    <input
      type="email"
      placeholder="Email"
      className="border-b border-gray-600 w-3/4 bg-transparent focus:outline-none focus:border-blue-500"
    />
    <textarea
      placeholder="Message"
      className="border-b border-gray-600 w-3/4 bg-transparent focus:outline-none focus:border-blue-500"
    ></textarea>
    <button type="submit" className="bg-[#2A6F97] text-white py-1 rounded hover:bg-blue-600">
      Send Message
    </button>
  </form>
</div>

        
      </div>

      {/* FAQ Section */}
      <div className="md:w-1/3 bg-blue-50 rounded p-4 mt-6 md:mt-0 shadow">
        <h2 className="text-lg font-bold mb-4 underline ">FAQ</h2>
        <div className ="bg-white rounded-2xl">
            
        {faqs.map((faq, index) => (
  <div key={index} className="border-b border-gray-200 py-2">
    <button
      className="font-semibold flex justify-between w-full"
      onClick={() => toggleFAQ(index)}
    >
      <span className={faq.question === "What is this platform for? " ? "font-bold underline" : ""}>
        {faq.question}
      </span>
      <span>{faqOpenIndex === index ? "−" : "+"}</span>
    </button>
    {faqOpenIndex === index && faq.answer && (
      <p className="text-sm mt-2 text-gray-700">{faq.answer}</p>
    )}
  </div>
))}

        </div>
      </div>
     
    </div>
    <Footer/>
    </div>
  );
};

export default HelpCenter;
