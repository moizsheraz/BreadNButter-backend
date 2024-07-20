const mongoose = require("mongoose");

const Quarter2Model = mongoose.Schema({
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
  event: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Quarter2", Quarter2Model);
