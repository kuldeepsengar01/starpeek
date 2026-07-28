import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/foodpartner/${id}`
      );

      console.log("Profile API Response:", res.data);

      setProfile(res.data.foodpartner);
      setFoods(res.data.foods);
    } catch (err) {
      console.log(err);

      if (err.response) {
        console.log(err.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-red-500">
          Food Partner Not Found
        </h1>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl"
        >
          Back To Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Banner */}

      <div className="relative h-72">

        <img
          src={profile.BannerImage}
          alt="Banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

      </div>

      {/* Profile */}

      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-xl -mt-24 relative p-8">

          <div className="flex flex-col md:flex-row items-center gap-6">

            <img
              src={profile.ProfileImage}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />

            <div className="flex-1">

              <h1 className="text-4xl font-bold">
                {profile.BusinessName}
              </h1>

              <p className="text-gray-600 mt-2">
                👤 {profile.FullName}
              </p>

              <p className="text-gray-600">
                📧 {profile.Email}
              </p>

              <p className="text-gray-600">
                📍 {profile.Address}
              </p>

              <p className="text-gray-600">
                📞 {profile.Contact}
              </p>

            </div>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold">
              Follow
            </button>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-6 mt-10 text-center">

            <div className="bg-orange-100 rounded-xl p-5">
              <h2 className="text-3xl font-bold text-orange-500">
                {foods.length}
              </h2>
              <p>Posts</p>
            </div>

            <div className="bg-orange-100 rounded-xl p-5">
              <h2 className="text-3xl font-bold text-orange-500">
                0
              </h2>
              <p>Followers</p>
            </div>

            <div className="bg-orange-100 rounded-xl p-5">
              <h2 className="text-3xl font-bold text-orange-500">
                0
              </h2>
              <p>Following</p>
            </div>

          </div>

        </div>

        {/* Videos */}

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Uploaded Food Videos
          </h2>

          {foods.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-500 shadow">
              No Videos Uploaded
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {foods.map((food) => (

                <div
                  key={food._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                >

                  <video
                    src={food.Image}
                    controls
                    className="w-full h-72 object-cover"
                  />

                  <div className="p-4">

                    <h3 className="text-xl font-bold">
                      {food.FoodName}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      {food.Discription}
                    </p>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;