import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const FullName = e.target.FullName.value;
    const Email = e.target.Email.value;
    const Address = e.target.Address.value;
    const Contact = e.target.Contact.value;
    const Password = e.target.Password.value;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/register`,
        {
          FullName,
          Email,
          Address,
          Contact,
          Password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      alert("User Registered Successfully");

      navigate("/");
    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient from-orange-400 via-orange-500 to-red-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <h1 className="text-4xl font-bold text-center text-blue-600">
          StarPeek
        </h1>

        <h2 className="text-2xl font-bold text-center text-gray-800 mt-2">
          User Registration
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Create your account to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="FullName"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="Email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>

            <input
              type="text"
              name="Address"
              placeholder="Enter your address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Contact Number
            </label>

            <input
              type="tel"
              name="Contact"
              placeholder="Enter your contact number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/user/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
