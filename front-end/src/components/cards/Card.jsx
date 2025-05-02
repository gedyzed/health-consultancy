const Card = ({Icon, title, content}) => {
  return (
    <div className="card w-57 card-md shadow-sm rounded-lg bg-[#023E8A] text-white text-center">
        <div className="flex justify-center items-center gap-x-1 px-2 pt-5">
            <Icon size={40}/>
            <h1 className="font-bold text-base">{ title }</h1>
        </div>
        <div className="card-body text-lg">
            {content}
        </div> 
    </div>
  )
}

export default Card
