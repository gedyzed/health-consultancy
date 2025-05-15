import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearStatus } from '../../features/auth/registerSlice';
import { clearAuthState } from '../../features/auth/loginSlice';
import { Link, useNavigate } from 'react-router-dom';
import google from '../../assets/Login/Icon/Google Icon.svg';
import signupImg from '../../assets/Signup/image/signup.png';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.register);

  const [formData, setFormData] = useState({
    email: '',
    role: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // Clear ALL auth states on mount
  useEffect(() => {
    dispatch(clearAuthState());
    dispatch(clearStatus());

    return () => {
      dispatch(clearStatus());
    };
  }, [dispatch]);

  // Handle success with delay
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login', { state: { fromRegistration: true } });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
    if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      setFormData({ email: '', role: '', password: '' });
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="font-Lora grid grid-cols-1 md:grid-cols-12 gap-4 mx-6 md:mx-12 lg:mx-24 my-10">
      {/* Form Section */}
      <div className="col-span-6 px-6 md:px-10">
        <form onSubmit={handleSubmit} noValidate>
          <h1 className="text-[#023E8A] font-bold text-xl text-center mb-6">Sign Up</h1>

          {/* Google Button (Disabled) */}
          <button
            type="button"
            disabled
            className="flex items-center justify-center border border-[#023E8A] text-white w-full h-10 mb-3 rounded-[10px] px-4"
          >
            <img src={google} alt="Google" className="h-5 w-5" />
            <span className="ml-3 text-[#023E8A]">Use Google account</span>
          </button>

          <p className="text-[#023E8A] text-center mb-4">Or sign up with</p>

          {/* Input Fields */}
          {['email', 'role', 'password'].map((field) => (
            <div key={field} className="mb-4">
              <label htmlFor={field} className="block text-[#023E8A] capitalize mb-1">
                {field}
              </label>
              <input
                id={field}
                name={field}
                type={field === 'password' ? 'password' : 'text'}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border-2 border-[#023E8A] rounded-[10px] h-10 px-3 text-black bg-white"
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          {/* Global error/success messages */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 bg-[#023E8A] text-white w-full h-10 rounded-[10px] disabled:opacity-50"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          <Link to="/login" className="block text-center text-sm text-[#023E8A] mt-3">
            Already have an account? Login
          </Link>
        </form>
      </div>

      {/* Image Section */}
      <div
        className="hidden md:flex col-span-6 justify-end items-end bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${signupImg})` }}
      >
        <div className="bg-white bg-opacity-70 m-5 p-4 rounded-lg max-w-sm">
          <h2 className="text-[#023E8A] font-extrabold text-lg mb-1">
            Empower Your Health with Expert Support
          </h2>
          <p className="text-[#023E8A] font-bold text-sm">
            Create an account to access trusted consultants and health tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;