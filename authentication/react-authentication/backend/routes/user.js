const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const nodemail = require("nodemailer");
require("dotenv").config();
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //  console.log(req.body);
    //i already user exists
    const existing = await User.findOne({ email: email });
    if (existing) {
      return res.status(400).json({
        success: true,
        message: "User already exists",
      });
    }
    //hasing password
    let hashedpassword;
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Error in hashing password",
      });
    }
    // inserting into db
    const user = await User.create({
      username,
      email,
      password: hashedpassword,
    });
    return res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "user Cannot be registered ,please try again later",
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    //  console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered",
      });
    }
    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) {
      return res.status(400).json({
        success: false,
        message: "password is incorrect",
      });
    }
    const playload = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(playload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.status(200).json({
      success: true,
      message: "login successful",
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Incorrect password",
    });
  }
});

router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  //  console.log(email);
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User not registered",
      });
    }
    const playload = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(playload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    let transporter = nodemail.createTransport({
      service: "gmail",
      auth: {
        user: "luckysiva516@gmail.com",
        pass: process.env.PASS_MAIL,
      },
    });
    let mailoptions = {
      from: "luckysiva516@gmail.com",
      to: "sivavenkatkumar34@gmail.com",
      subject: "Reset Password",
      text: `http://localhost:5173/resetpassword/${token}`,
    };
    transporter.sendMail(mailoptions, (error, info) => {
      if (error) {
        res.status(400).json({
          success: false,
          message: "failed to send email",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "email sent",
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "failed to send email",
    });
  }
});

router.post("/resetpassword/:token", async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;
  // console.log(password);
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    //   console.log(decoded);
    const hashedpassword = await bcrypt.hash(password, 10);
    // console.log(hashedpassword);
    await User.findByIdAndUpdate(decoded.id, { password: hashedpassword });
    return res.status(200).json({
      success: true,
      message: "password updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
});

const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token is missing",
      });
    }
    try {
      // it returns playload after verification
      const playload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(playload);
      req.username = playload.username;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "something went wrong",
    });
  }
};
router.get("/verify", verifyUser, (req, res) => {
  res.status(200).json({
    success: true,
    message: "authorized",
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({
    success: true,
  });
});
module.exports = router;
