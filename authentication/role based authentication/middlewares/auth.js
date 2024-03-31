const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.body.token || req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }
    //verify the token
    try {
      // it returns playload after verification
      const playload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(playload);
      req.user = playload;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "this is protected route for  students",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User Role is not Matching",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "this is protected route for  admin",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User Role is not Matchingrnal error",
    });
  }
};
