import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-start h-screen px-30 gap-y-5 bg-[url(src/assets/home_page/images/Hero.png)]
    bg-cover text-white ">
        <h1 className="text-5xl w-120 font-bold">Take Control of your health-begin with the right support.</h1>
        <p>Whether you're seeking support or offering it, we're here for you </p> 
        <Link to="/register" className="btn btn-xl bg-[#2A6F97] w-70 border-none text-white"> 
            Get Started
        </Link>

    </div> 
  )
}

export default Home