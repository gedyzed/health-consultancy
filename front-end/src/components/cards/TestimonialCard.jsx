const TestimonialCard = ({pp, name, content}) => {
    return (
        <div>
            <div className="relative w-64 rounded-lg border border-blue-900 bg-white overflow-hidden flex flex-col items-center pt-20 ">
                <div className="absolute top-0 z-10 pt-8">
                    <img
                        src={pp}
                        alt={name}
                        className="w-20 h-20 rounded-full border border-[#011a33] bg-white"
                    />
                </div>

                <div className="w-full bg-[#002F5F] text-white text-center px-4 pt-10 pb-6 rounded-t-xl">
                    <h1 className="font-semibold text-sm">{name}</h1>
                    <p className="text-sm mt-2">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
