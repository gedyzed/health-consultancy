import CommentCard from "./commentCard"

export default function CommentsSection(){
    const comments =[
        {name :"Tomas Able ", comment:"lorem ipsum dolor sit amet, consectetur adipiscing elit", rating: 4},
        {name :"Tomas Able ", comment:"lorem ipsum dolor sit amet, consectetur adipiscing elit", rating: 3},
        {name :"Tomas Able ", comment:"lorem ipsum dolor sit amet, consectetur adipiscing elit", rating: 5}
    
    
    ]
   
return(
    <div >
<div className="p-6 border border-base-300 rounded-md mt-14">
<h2 className="font-bold font-serif text-lg mb-4">Comments</h2>
<div className ="flex flex-col gap-4">
    {comments.map((c,i)=>(
        <CommentCard key={i} {...c}/>
    ))}
</div>
    </div>
    </div>
)


}