import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";;
import { Link, useNavigate } from "react-router-dom";
import { registerUser, clearStatus } from "../../features/auth/registerSlice";
import google from "../../assets/Login/Icon/Google Icon.svg";
import { registerAgoraUser } from "../../features/chat/chatSliceApi";
import { unwrapResult } from "@reduxjs/toolkit";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, success } = useSelector((state) => state.register);

  const [formData, setFormData] = useState({
    email: "",
    role: "",
    password: "",
    created_at:"",
    updated_at:"",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => {
      dispatch(clearStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email format";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }
    return newErrors;
  };


const registerChatUser = async (email) => {
  if (typeof email !== "string") {
    throw new Error("Invalid email address");
  }

  const [local, domain] = email.split("@");
  const username = `${local}_${domain}`;

  if (!username) {
    throw new Error("Username is empty");
  }

  try {
    const result = await dispatch(registerAgoraUser(username));
    const { userData } = unwrapResult(result);
   
    console.log("Chat user registered successfully!");
  } catch (err) {
    console.error("registerChatUser failed:", err);
    throw err; 
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    // Ensure chat user registration is successful first
    await registerChatUser(formData.email);

    // Only run this if chat registration was successful
    await dispatch(registerUser(formData));

    // Clear form
    setFormData({ email: "", role: "", password: "" });
    setErrors({});
  } catch (error) {
    console.error("User registration failed:", error);
    setErrors({ general: error.message || "Registration failed" });
  }
};


  

  return (
    <div className="font-Lora md:grid md:grid-cols-12 my-[35px] justify-center lg:mx-[100px] md:mx-[50px] mx-[30px] sm:mx-[40px] md:gap-4 lg:gap-6">
      {/* Form section */}
      <div className="col-span-6 text-white h-110 w-full md:px-15 lg:px-20 px-8">
        <form onSubmit={handleSubmit} noValidate>
          <h1 className="text-[#023E8A] font-bold text-center text-xl mb-7">
            Sign Up
          </h1>
          
          <button
            type="button"
            className="flex items-center justify-center border-2 border-[#023E8A] text-white w-full h-10 my-1 rounded-[10px] px-4"
            disabled={loading}
          >
            <img src={google} alt="Google" className="h-5 w-5" />
            <span className="block text-center w-full text-[#023E8A]">
              Use Google account
            </span>
          </button>

          <p className="text-[#023E8A] text-center mt-1">Or Sign up with</p>

          {/* Email */}
          <label htmlFor="email" className="block mb-1 text-[#023E8A]">
            Email
          </label>
          <input
            className="w-full bg-white border-2 rounded-[10px] h-10 mb-2 border-[#023E8A]"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Role */}
          <label htmlFor="role" className="block mb-1 text-[#023E8A]">
            Role
          </label>
          <input
            className="w-full border-2 border-[#023E8A] rounded-[10px] h-10"
            type="text"
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

          {/* Password */}
          <label htmlFor="password" className="block mb-1 text-[#023E8A]">
            password
          </label>
          <input
            className="w-full border-2 rounded-[10px] h-10 border-[#023E8A]"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* Server messages */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2">Registration successful!</p>}

          {/* Submit */}
          <div className="mt-8">
            <button
              type="submit"
              className="text-white w-full h-10 bg-[#023E8A] rounded-[10px] cursor-pointer"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <Link to="/login" className="flex justify-center text-[#023E8A] text-sm mt-1">
              Do you have an account ? Login
            </Link>
          </div>
        </form>
      </div>

      {/* Image section */}
      <div className="flex-col flex justify-end h-80 sm:h-110 col-span-6 bg-[url('src/assets/Signup/image/signup.png')] bg-cover">
        <div className="bg-white opacity-50 flex flex-col m-3 sm:m-4 md:m-6 lg:m-10 p-3 sm:p-4 md:p-6 lg:p-10 rounded-lg">
          <h2 className="text-[#023E8A] text-sm sm:text-lg md:text-base lg:text-3xl font-extrabold mb-1 sm:mb-2">
            Empower Your Health with Expert Support
          </h2>
          <p className="text-[#023E8A] text-[10px] font-bold extra-bold">
            Create an account to access trusted consultants and health tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;