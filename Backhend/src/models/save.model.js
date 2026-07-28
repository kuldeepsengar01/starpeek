const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema(
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

const SaveModel = mongoose.model("Save", saveSchema);

module.exports = SaveModel;