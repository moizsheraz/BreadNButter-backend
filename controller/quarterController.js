const Quarter1 = require("../Model/QuarterModel");

exports.uploadQuarter1 = async (req, res) => {
  try {
    const { name, members, location } = req.body;

    const quarter1 = new Quarter1({
      id: req.user._id,
      name,
      members,
      location,
    });

    // console.log(req.user);
    if (quarter1) {
      await quarter1.save();
    } else {
      return res
        .status(400)
        .json({ message: "Error saving the quarter1 data" });
    }

    return res.status(201).json({
      data: quarter1,
      message: "Quarter1 data uploaded successfully",
    });
  } catch (error) {
    console.log("Error in quarter 1 uploading", error.message);
    res.status(500).json({ message: "Error uploading the quarter1 data" });
  }
};

exports.getQuarter1 = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const quarter1 = await Quarter1.findById(id);

    if (!quarter1) {
      return res.status(404).json({ message: "Quarter1 not found" });
    }

    return res.status(201).json({
      data: quarter1,
      message: "Quarter1 data shown successfully",
    });
  } catch (error) {
    console.log("Error in quarter 1 uploading", error.message);
    res.status(500).json({ message: "Error in getting the quarter1 data" });
  }
};

exports.getIndividualQuarter1 = async (req, res) => {
  try {
    const quarter1 = await Quarter1.findOne({ id: req.user._id });

    if (!quarter1) {
      return res.status(404).json({ message: "Quarter1 not found" });
    }

    return res.status(201).json({
      data: quarter1,
      message: "Quarter1 data shown successfully",
    });
  } catch (error) {
    console.log("Error in getting quarter1", error.message);
    res.status(500).json({ message: "Error in getting the quarter1 data" });
  }
};
