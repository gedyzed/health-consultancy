const Review = ({ pp, name, date, message }) => {
    return (
      <div className="rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={pp}
              alt={`${name}’s profile`}
              className="w-8 h-8 rounded-full bg-gray-200"
            />
            <h3 className="text-sm font-medium text-gray-900">{name}</h3>
          </div>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
  
        <div className="mt-3 pl-5">
          <p className="text-sm rounded-lg">
            {message}
          </p>
        </div>
      </div>
    );
  };
  
  export default Review;
  

  