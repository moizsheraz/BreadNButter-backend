const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async (req, res, next) => {
  // const { token } = req.cookies;
  // console.log("COOKIES", token);
  const token = req.headers.authorization.split(" ")[1];

  // console.log(token);

  if (!token)
    return res
      .status(401)
      .json({ message: "Please Login to access this resource" });

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedData) return res.status(401).json({ message: "Invalid Token" });

  // console.log("decodedData", decodedData);
  req.user = await User.findById(decodedData.userId);
  // console.log("FRONTEND", req.user);

  //   console.log("User", req.user);

  next();
};

exports.authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    console.log("Role", req.user.role);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `${req.user.role} is not authorized to perform this action`,
      });
    }

    next();
  };
};
