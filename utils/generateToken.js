const jwt = require("jsonwebtoken");

const generateTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // console.log("TOKEN", token);

  res.cookie("token", token, {
    maxAge: 16 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return token;
};

module.exports = generateTokenAndSetCookies;
