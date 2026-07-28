import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleVideo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setVideo(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!foodName.trim()) {
      return alert("Enter Food Name");
    }

    if (!description.trim()) {
      return alert("Enter Description");
    }

    if (!video) {
      return alert("Select a Video");
    }

    const formData = new FormData();
    formData.append("FoodName", foodName);
    formData.append("Description", description);
    formData.append("video", video);

    try {
      setLoading(true);
      setProgress(0);

      const response = await axios.post(
        "http://localhost:3000/api/food/createfood",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (!event.total) return;

            const percent = Math.round(
              (event.loaded * 100) / event.total
            );

            setProgress(percent);
          },
        }
      );

      console.log(response.data);

      alert("Food Uploaded Successfully");

      setFoodName("");
      setDescription("");
      setVideo(null);
      setPreview("");
      setProgress(0);

      const input = document.getElementById("video");
      if (input) input.value = "";

      navigate("/");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
         ★ StarPeek
        </h1>

        <h3 className="text-3xl font-bold text-center text-orange-500 mb-8">
          Upload Food Video
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="font-semibold block mb-2">
              Food Name
            </label>

            <input
              type="text"
              placeholder="Food Name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Upload Video
            </label>

            <input
              id="video"
              type="file"
              accept="video/*"
              onChange={handleVideo}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {preview && (
            <video
              src={preview}
              controls
              className="w-full h-80 rounded-xl border object-cover"
            />
          )}

          <div>
            <label className="font-semibold block mb-2">
              Description
            </label>

            <textarea
              rows="5"
              placeholder="Food Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-xl p-3 resize-none focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {loading && (
            <div>
              <div className="flex justify-between mb-2 text-sm font-semibold">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-bold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading
              ? `Uploading ${progress}%`
              : "Upload Food"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-xl bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold"
          >
            Back
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateFood;