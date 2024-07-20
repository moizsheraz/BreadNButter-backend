const Quarter2 = require("../Model/Quarter2Model");
const Quarter1 = require("../Model/QuarterModel");
const userQuarter2 = require("../Model/userQuarter2Model");

exports.getQuarter2 = async (req, res) => {
  try {
    const quarter2 = await Quarter2.find();
    res.status(200).json(quarter2);
  } catch (error) {
    console.log("Error in getting quarter2", error.message);
    res.status(500).json({ message: "Error in getting the quarter2 data" });
  }
};

exports.createQuarter2ForUser = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data.option1.description);
    const quarter1 = await Quarter1.findOne({ id: req.user._id });

    // console.log(quarter1.budjet);
    let totalAmount = quarter1.budjet;

    if (data.option1.selected) {
      totalAmount += data.option1.netProfit;
    }
    if (data.option2.selected) {
      totalAmount += data.option2.netProfit;
    }
    if (data.option3.selected) {
      totalAmount += data.option3.netProfit;
    }
    console.log(totalAmount);

    let quarter2Data = {
      id: req.user._id,
      option1: {
        selected: data.option1.selected,
        description: data.option1.description,
        cost: data.option1.cost,
        otherCost: data.option1.otherCost,
        income: data.option1.income,
        netProfit:
          data.option1.income - (data.option1.cost + data.option1.otherCost),
      },
      option2: {
        selected: data.option2.selected,
        description: data.option2.description,
        cost: data.option2.cost,
        otherCost: data.option2.otherCost,
        income: data.option2.income,
        netProfit:
          data.option2.income - (data.option2.cost + data.option2.otherCost),
      },
      option3: {
        selected: data.option3.selected,
        description: data.option3.description,
        cost: data.option3.cost,
        otherCost: data.option3.otherCost,
        income: data.option3.income,
        netProfit:
          data.option3.income - (data.option3.cost + data.option3.otherCost),
      },
      totalProfit: totalAmount,
      event: data.event,
    };

    const quarter2 = await userQuarter2.create(quarter2Data);

    res.status(201).json(quarter2);
  } catch (error) {
    console.log("Error in creating quarter2", error.message);
    res.status(500).json({ message: "Error in creating the quarter2 data" });
  }
};

exports.getQuarter2ForUser = async (req, res) => {
  try {
    const quarter2 = await userQuarter2.findOne({ id: req.user._id });
    res.status(200).json(quarter2);
  } catch (error) {
    console.log("Error in getting quarter2", error.message);
    res.status(500).json({ message: "Error in getting the quarter2 data" });
  }
};

exports.getQuarter2ForUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const quarter2 = await userQuarter2.findById(id);
    res.status(200).json(quarter2);
  } catch (error) {
    console.log("Error in getting quarter2", error.message);
    res.status(500).json({ message: "Error in getting the quarter2 data" });
  }
};
