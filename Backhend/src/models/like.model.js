const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fooditems",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LikeModel = mongoose.model("Like", likeSchema);

module.exports = LikeModel;