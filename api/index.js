const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookies = require("../utils/generateToken");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
const corsOptions = {
  origin: "https://bread-n-butter-client.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Import routes
// const user = require("../routes/userRoutes");
// const quarter = require("../routes/quarterRoutes");
// const income = require("../routes/IncomeRoutes");
// const admin = require("../routes/adminRoute");
// const quarter2 = require("../routes/quarter2Route");

// Route handlers
app.get("/health", (req, res) => {
  res.status(200).json("Health checking");
});
app.post("/api/v1/login",async(req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const token = generateTokenAndSetCookies(user._id, res);
    console.log(token);
    res.status(201).json({
      data: user,
      token,
      message: "login successful",
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
})

// app.use("/api/v1", user);
// app.use("/api/v1", quarter);
// app.use("/api/v1/quarter2", quarter2);
// app.use("/api/v1", income);
// app.use("/api/v1", admin);




// Connect to MongoDB
// const DB = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD);

const connectToMongodb = async () => {
  try {
    await mongoose.connect("mongodb+srv://sherazmoiz9:FMGxSK0XXAOR42S0@cluster0.l6qfsrz.mongodb.net/breadnButter");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error in connecting to MongoDB", error.message);
  }
};

// Start server and connect to MongoDB
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  connectToMongodb();
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => res.send("Express on Vercel"));


module.exports = app;
