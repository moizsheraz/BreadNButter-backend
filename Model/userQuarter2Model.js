const mongoose = require("mongoose");

const userQuarter2 = mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  option1: {
    selected: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    otherCost: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    netProfit: {
      type: Number,
      required: true,
    },
  },
  option2: {
    selected: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    otherCost: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    netProfit: {
      type: Number,
      required: true,
    },
  },
  option3: {
    selected: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    otherCost: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    netProfit: {
      type: Number,
      required: true,
    },
  },
  totalProfit: {
    type: Number,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userQuarter2", userQuarter2);
