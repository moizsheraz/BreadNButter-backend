const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");


dotenv.config();

const app = express();

const DB = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD);

const connectToMongodb = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error in connecting to Mongodb", error.message);
  }
}

const corsOptions = {
  origin: "https://bread-n-butter-client.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Route imports
const user = require("./routes/userRoutes");
const quarter = require("./routes/quarterRoutes");
const income = require("./routes/IncomeRoutes");
const admin = require("./routes/adminRoute");
const quarter2 = require("./routes/quarter2Route");

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json("Health checking");
});

// API routes
app.use("/api/v1", user);
app.use("/api/v1", quarter);
app.use("/api/v1/quarter2", quarter2);
app.use("/api/v1", income);
app.use("/api/v1", admin);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  connectToMongodb();
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
