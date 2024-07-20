const mongoose = require("mongoose");

const Quarter1Schema = mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please Enter your team name"],
  },
  members: {
    type: Number,
    required: [true, "Please Enter your team member number"],
  },
  location: {
    type: String,
    required: [true, "Please Enter your  location"],
  },
  budjet: {
    type: Number,
    default: 5000,
  },
});

module.exports = mongoose.model("Quarter1", Quarter1Schema);
