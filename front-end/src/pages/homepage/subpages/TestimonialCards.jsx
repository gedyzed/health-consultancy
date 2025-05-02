import { useState } from "react";
import TestimonialCard from "../../../components/cards/TestimonialCard";
import Hero from "../../../assets/home_page/images/Hero.png";

const TestimonialCards = () => {
  const [testimonials] = useState([
    {
      pp: Hero,
      name: "Jane Cooper",
      content:
        "Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      pp: Hero,
      name: "John Doe",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac orci quis tortor imperdiet venenatis.",
    },
    {
      pp: Hero,
      name: "Alice Smith",
      content:
        "Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate.",
    },
    {
      pp: Hero,
      name: "Robert Brown",
      content:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    },
  ]);

  return (
    <div className="p-10">
      <h1 className="text-center text-2xl text-[#023E8A] font-bold pb-10">
        Users Feedback
      </h1>
      <div className="flex flex-wrap gap-5 justify-center">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            pp={testimonial.pp}
            name={testimonial.name}
            content={testimonial.content}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCards;
