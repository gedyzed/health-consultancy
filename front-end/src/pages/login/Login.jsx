import {Link} from "react-router-dom";
import React from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import {GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";



const Login = () => {
const[email, setEmail] = React.useState("");
const[password, setPassword] = React.useState("");
const[error, setError] = React.useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  // Uncomment this when connecting to real backend
  /*
  try {
    const response = await axios.post("backend-url/login", {
      email,
      password,
    }); 

    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  } catch (err) {
    setError("Invalid email or password.");
  }
  */

  // MOCKED LOGIN for testing
  try {
    const response = {
      data: {
        token: "mock-token-124"
      }
    };


    await new Promise(resolve => setTimeout(resolve, 500));
   /*  throw new Error("Mock login failed"); */
     localStorage.setItem("token", response.data.token);
    navigate("/"); 
  } catch (err) {
    setError("Invalid email or password.");
  }
};

const handleGoogleLoginSuccess = async (response) => {
  // to be uncommented for the back-end integration
/*   try {
    const token = response.credential;
    const res = await axios.post("/auth/google-login", { token });
    localStorage.setItem("token", res.data.token);
    navigate("/");
  } catch (err) {
    setError("Google login failed.");
    navigate("/a")
  } */
  try {
    const token = response.credential;
    const decoded = jwtDecode(token); 
    console.log("Google Token Payload:", decoded);

    localStorage.setItem("token", token); 
    navigate("/");
  } catch (err) {
    console.error("Google login error:", err);
    setError("Google login failed.");
  }
};


  return (
    <div className=" font-Lora md:grid  grid-cols-12   my-[35px] lg:mx-[44px]  md:mx-[30px] sm:mx-[20px] md:gap-4 lg:gap-6 bg-white">
      <div className="flex flex-col justify-evenly col-span-4 mb-3 sm:mb-5 h-100">
        <form action="" onSubmit={handleSubmit}>
          <div className=" w-full ">
            <h1 className="text-[#023E8A]   font-bold text-center text-xl mb-7 ">
              Welcome Back!
            </h1>
    {/*         <button className="flex items-center justify-center border-2 border-[#023E8A] text-white w-full h-10 my-1 rounded-[10px] px-4 ">
              <img
                src="/Login/Icon/Google Icon.svg"
                alt="Google"
                className="h-5 w-5 "
              />
              <span className="block text-center w-full text-[#023E8A] ">
                Use Google account
              </span>
            </button> */}
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => setError("Google login failed.")}
              useOneTap
              shape="pill"
            >
              <button className="flex items-center justify-center border-2 border-[#023E8A] text-white w-full h-10 my-1 rounded-[10px] px-4">
                <img src="/Login/Icon/Google Icon.svg" alt="Google" className="h-5 w-5" />
                <span className="block text-center w-full text-[#023E8A]">
                  Use Google account
                </span>
              </button>
            </GoogleLogin>
            <p className="text-[#023E8A] text-center">Or log in with </p>
            <label className="block mb-1 text-[#023E8A]" htmlFor="email">
              Email
            </label>
            <input
              className="pl-1 w-full bg-white border-2  rounded-[10px] h-10 mb-2"
              style={{ borderColor: "#023E8A" }}
              type="email"
              name="email"
              id="email"
              value ={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-[#023E8A]">
              password
            </label>
            <input
              className="pl-1 w-full text-red bg-white border-2 rounded-[10px] h-10 "
              style={{ borderColor: "#023E8A" }}
              type="password"
              name="password"
              id="password"
              value = {password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error &&(
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
          <p className="flex justify-end text-[#023E8A] text-sm">Forgot password ?</p>
          <div className="mt-8">
            <button
              className="  text-white w-full h-10 bg-[#023E8A] rounded-[10px]"
            >
              Login
            </button>
            <Link className="flex justify-center text-[#023E8A] text-sm mt-1" to="/">Don’t you have an account ? Sign Up</Link>
          </div>
        </form>
      </div>
      <div className="col-span-8 grid grid-cols-10  justify-center bg-white mb-5 bg-[url('src/assets/Login/images/Frame%205.png')]  bg-cover bg-no-repeat bg-center ">
        <div className=" bg-white flex flex-col justify-center  opacity-50 col-span-5 m-3 sm:m-4 md:m-6 lg:m-10 p-3 sm:p-4 md:p-6 lg:p-10 ">
          <div className=" mb-1 sm:mb-2  text-[#023E8A]  text-sm sm:text-lg md:text-base lg:text-2xl font-extrabold text-shadow-lg">
            Access your health journey
            — anytime, anywhere.
          </div>
          <div className="text-[#023E8A]  text-[10px] font-bold">
            {" "}
            Log in to manage appointments, view records, and connect with your
            consultant.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;