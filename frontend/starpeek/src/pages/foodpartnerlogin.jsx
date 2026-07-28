import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Email = e.target.Email.value;
    const Password = e.target.Password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/foodpartner/login",
        {
          Email,
          Password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      alert("Login Successfully");

      navigate("/createfood");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-orange-500 via-red-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-center text-blue-600">
          StarPeek
        </h1>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mt-2">
          Food Partner Login
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Login to manage your restaurant and orders.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="Email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
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
          Don't have a Food Partner account?{" "}
          <Link
            to="/foodpartner/ragister"
            className="text-orange-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;