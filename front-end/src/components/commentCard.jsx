import { FaStar, FaRegStar } from "react-icons/fa";

export default function CommentCard({ name, comment, rating }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? <FaStar key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-white" />
    );
  };

  return (
    <div className="font-serif bg-[#2A6F97] text-white rounded-xl p-4 shadow-md flex items-start gap-4">
      <div className="avatar">
        <div className="w-10 rounded-full bg-gray-400" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-center mt-4">
          <span className="font-semi-bold ">{name}</span>
          <div className="flex text-yellow-400 text-sm">{renderStars(rating)}</div>
        </div>
        <p className="text-sm">{comment}</p>
      </div>
    </div>
  );
}
