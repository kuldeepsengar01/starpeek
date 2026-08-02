import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const FoodPartner = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const BusinessName = e.target.BusinessName.value;
    const FullName = e.target.FullName.value;
    const Email = e.target.Email.value;
    const Address = e.target.Address.value;
    const Contact = e.target.Contact.value;
    const Password = e.target.Password.value;

    const BannerImage = e.target.BannerImage.files[0];
    const ProfileImage = e.target.ProfileImage.files[0];

    // FormData
    const formData = new FormData();

    formData.append("BusinessName", BusinessName);
    formData.append("FullName", FullName);
    formData.append("Email", Email);
    formData.append("Address", Address);
    formData.append("Contact", Contact);
    formData.append("Password", Password);

    formData.append("BannerImage", BannerImage);
    formData.append("ProfileImage", ProfileImage);

    try {
      const response = await axios.post(
        "https://starpeek.onrender.com/api/foodpartner/register",
        formData,
        {
          withCredentials: true,
        }
      );
      alert("Food Partner Registered Successfully");

      navigate("/createfood");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          StarPeek
        </h1>

        <h2 className="text-2xl font-bold text-center text-gray-800 mt-2">
          Food Partner Registration
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Join StarPeek and start selling your delicious food.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">Business Name</label>
            <input
              type="text"
              name="BusinessName"
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Business Name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="FullName"
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Full Name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="Email"
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Address</label>
            <textarea
              name="Address"
              rows="3"
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Restaurant Address"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Contact</label>
            <input
              type="text"
              name="Contact"
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Contact Number"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Banner Image
            </label>

            <input
              type="file"
              name="BannerImage"
              accept="image/*"
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Profile Image
            </label>

            <input
              type="file"
              name="ProfileImage"
              accept="image/*"
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              name="Password"
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg"
          >
            Register as Food Partner
          </button>
        </form>

        <p className="text-center mt-6">
          Already registered?{" "}
          <Link
            to="/foodpartner/login"
            className="text-orange-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FoodPartner;