const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookies = require("../utils/generateToken");

exports.signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "This email already exists",
      });
    }

    // HASH password
    const saLt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saLt);

    const newUser = new User({ name, email, password: hashedPassword });

    let token;
    if (newUser) {
      // generate JWT token
      token = generateTokenAndSetCookies(newUser._id, res);
      await newUser.save();
    } else {
      res.status(400).json({
        error: "Error in creating user",
      });
    }

    console.log("TOKENNN", token);
    return res.status(201).json({
      data: newUser,
      token,
      message: "signup successful",
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Error in creating user" });
  }
};

exports.loginUser = async (req, res) => {
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
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
