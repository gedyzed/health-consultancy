import { useState } from "react";

const FAQSection = () => {
    const faqs = [
        {
            question: "When should I see a primary care provider?",
            answer:
                "You should see a primary care provider not just when you're sick, but also for routine check-ups and preventive care. Regular visits help monitor your overall health, catch issues early, and keep you up to date on screenings, vaccinations, and healthy habits.\n\nPrimary care providers are also a great resource for everyday concerns—whether it's a new symptom, minor illness, mental health support, or medication refill. They know your medical history and can guide you through next steps, including referrals to specialists if needed. Having a trusted provider means you have someone to turn to for both short-term needs and long-term health planning.",
        },
        {
            question: "How often should I schedule a check-up?",
            answer:
                "Adults should typically schedule annual check-ups, but your doctor may suggest a different frequency based on your health history.",
        },
        {
            question:
                "Can a primary care doctor treat chronic conditions like diabetes or hypertension?",
            answer:
                "Yes, primary care doctors often manage chronic conditions and coordinate with specialists when needed.",
        },
        {
            question: "What is the difference between urgent care and primary care?",
            answer:
                "Urgent care handles immediate, non-life-threatening issues. Primary care focuses on long-term health and preventive care.",
        },
        {
            question: "Is preventive care part of primary care?",
            answer:
                "Yes, preventive care like screenings, immunizations, and counseling is a key part of primary care.",
        },
    ];

    const [selectedFAQ, setSelectedFAQ] = useState(0);

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-6xl px-4 my-10">
                <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>

                {/* Mobile and Tablet View */}
                <div className="block md:hidden join join-vertical bg-base-100">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="collapse collapse-arrow join-item border-base-300 border"
                        >
                            <input
                                type="radio"
                                name="faq-accordion"
                                defaultChecked={index === 0}
                            />
                            <div className="collapse-title font-semibold">{faq.question}</div>
                            <div className="collapse-content bg-[#c0f0f0] text-sm">{faq.answer}</div>
                        </div>
                    ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex flex-col md:flex-row gap-4 relative">
                    <div className="w-full md:w-1/2 space-y-2 z-10">
                        {faqs.map((faq, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedFAQ(index)}
                                className={`btn w-full justify-between text-left normal-case transition-all ${selectedFAQ === index
                                        ? "btn-primary text-white"
                                        : "btn-ghost border border-base-300"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    {faq.question}
                                </span>
                                <span className="text-xl">›</span>
                            </button>
                        ))}
                    </div>
                    <div className="w-full md:w-1/2 p-6 bg-[#D0EEEE] rounded-box shadow-md">
                        <h4 className="font-semibold mb-2">
                            {faqs[selectedFAQ].question}
                        </h4>
                        <p className="text-sm  text-gray-700 whitespace-pre-line">
                            {faqs[selectedFAQ].answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FAQSection;
