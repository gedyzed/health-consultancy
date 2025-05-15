import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/auth/loginSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user, token } = useSelector((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Auto-redirect based on role
  useEffect(() => {
    if (token && user) {
      const role = user.role;
      if (role === 'doctor') navigate('/doctor-dashboard');
      else if (role === 'patient') navigate('/patient-dashboard');
      else navigate('/dashboard');
    }
  }, [token, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    dispatch(loginUser({ email, password }))
      .unwrap()
     
    
      .catch(() => {}); // error already handled in slice
  };

  return (
    <div className="font-Lora md:grid grid-cols-12 my-[35px] lg:mx-[44px] md:mx-[30px] sm:mx-[20px] md:gap-4 lg:gap-6 bg-white">
      <div className="flex flex-col justify-evenly col-span-4 mb-3 sm:mb-5 h-100">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[#023E8A] font-bold text-center text-xl mb-7">
            Welcome Back!
          </h1>

          {/* Google Login - Disabled for now */}
          <div className="flex items-center justify-center border-2 border-[#023E8A] text-white w-full h-10 my-1 rounded-[10px] px-4 opacity-50 cursor-not-allowed bg-gray-100">
            <img
              src="/Login/Icon/Google Icon.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span className="block text-center w-full text-[#023E8A]">
              Google login coming soon
            </span>
          </div>

          <p className="text-[#023E8A] text-center mt-1">Or log in with</p>

          <label htmlFor="email" className="block mb-1 text-[#023E8A]">
            Email
          </label>
          <input
            className="pl-1 w-full bg-white border-2 rounded-[10px] h-10 mb-2"
            style={{ borderColor: '#023E8A' }}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="block mb-1 text-[#023E8A]">
            Password
          </label>
          <input
            className="pl-1 w-full bg-white border-2 rounded-[10px] h-10"
            style={{ borderColor: '#023E8A' }}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <p className="flex justify-end text-[#023E8A] text-sm">
            Forgot password?
          </p>

          <div className="mt-8">
            <button
              className="text-white w-full h-10 bg-[#023E8A] rounded-[10px]"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <Link
              className="flex justify-center text-[#023E8A] text-sm mt-1"
              to="/register"
            >
              Don’t have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>

      <div className="col-span-8 grid grid-cols-10 justify-center bg-white mb-5 bg-[url('src/assets/Login/images/Frame%205.png')] bg-cover bg-no-repeat bg-center">
        <div className="bg-white flex flex-col justify-center opacity-50 col-span-5 m-3 sm:m-4 md:m-6 lg:m-10 p-3 sm:p-4 md:p-6 lg:p-10">
          <div className="mb-1 sm:mb-2 text-[#023E8A] text-sm sm:text-lg md:text-base lg:text-2xl font-extrabold text-shadow-lg">
            Access your health journey — anytime, anywhere.
          </div>
          <p className="text-[#023E8A] text-[10px] font-bold">
            Log in to manage appointments, view records, and connect with your consultant.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
