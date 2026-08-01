import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {


  const navigate=useNavigate();

  const hendleSubmit=async (e)=>{
    e.preventDefault();

    const Email=e.target.Email.value;
    const Password=e.target.Password.value;
  try{
    const response= await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`,{
      Email,
      Password
    },{
      withCredentials:true
    })

    alert('Login Successfully');
    navigate('/')
  }catch(err){
     alert('Please Enter a valid details');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center from-orange-500 via-red-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-blue-600">
          StarPeek
        </h1>
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Login to your account
        </p>

        {/* Login Form */}
        <form onSubmit={hendleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="Password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/user/ragister"
            className="text-orange-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
