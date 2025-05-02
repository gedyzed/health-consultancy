import {Link} from "react-router-dom";
import google from "../../assets/Login/Icon/Google Icon.svg"

const Register = () => {
  return (
    <>
      <div className=" font-Lora md:grid md:grid-cols-12 my-[35px] justify-center lg:mx-[100px]  md:mx-[50px] mx-[30px]  sm:mx-[40px] md:gap-4 lg:gap-6">
        <div className=" col-span-6 text-white  h-110 w-full md:px-15 lg:px-20 px-8">
          <form action="">
            <div>
              <h1 className="text-[#023E8A]   font-bold text-center text-xl mb-7 ">
                Sign Up
              </h1>
              <button className="flex items-center justify-center border-2 border-[#023E8A] text-white w-full h-10 my-1 rounded-[10px] px-4 ">
                <img
                  src={google}
                  alt="Google"
                  className="h-5 w-5 "
                />
                <span className="block text-center w-full text-[#023E8A] ">
                  Use Google account
                </span>
              </button>
              <p className="text-[#023E8A] text-center">Or Sign up with </p>
              <label className="block mb-1 text-[#023E8A]" htmlFor="email">
                Email
              </label>
              <input
                className="w-full bg-white border-2  rounded-[10px] h-10 mb-2 border-[#023E8A]"
                type="email"
                name="email"
                id="email"
              />{" "}
            </div>
            <div>
              <lable htmlFor="Role" className=" block mb-1 text-[#023E8A]">
                Role
              </lable>
              <input
                id="Role"
                name="Role"
                type="text"
                className=" w-full border-2 border-[#023E8A] rounded-[10px] h-10"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-[#023E8A]">
                password
              </label>
              <input
                className="w-full  border-2 rounded-[10px] h-10 border-[#023E8A] "
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div className="mt-8">
              <button
                className="  text-white w-full h-10 bg-[#023E8A] rounded-[10px]"
              >
                Sign Up
              </button>
              <Link className="flex justify-center text-[#023E8A] text-sm mt-1" to='/login'>
                Do you have an account ? Login
              </Link>
            </div>
          </form>
        </div>
        <div className="flex-col flex justify-end  h-80 sm:h-110 col-span-6 bg-[url('src/assets/Signup/image/signup.png')] bg-cover ">
        <div className=" bg-white flex flex-col  opacity-50 col-span-5 m-3 sm:m-4 md:m-6 lg:m-10 p-3 sm:p-4 md:p-6 lg:p-10 ">
          <div className=" mb-1 sm:mb-2  text-[#023E8A]  text-sm sm:text-lg md:text-base lg:text-3xl font-extrabold">
          Empower Your Health with Expert Support 
          </div>
          <div className="text-[#023E8A]  text-[10px] font-bold extra-bold ">
            {" "}
            Create an account to access trusted consultants and health tools.
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Register;
