const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Member = require("../models/memberModel");

exports.authenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies.authToken || req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    if (decoded.role === "Admin") {
      user = await User.findById(decoded.id).populate("role");
      if (!user) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } else if (decoded.role === "Member") {
      user = await Member.findById(decoded.id).populate("role");
      if (!user) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } else {
      return res.status(400).json({ message: "Invalid role from token" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
