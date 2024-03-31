// by using bcrypt we can convert plain password to some hashed code
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//sign up
exports.signup = async (req, res) => {
  try {
    //get data
    const { name, email, password, role } = req.body;
    console.log(req.body);
    // check if user already exist
    const existing = await User.findOne({ email });
    // console.log(existing);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //secure password
    let hashedpassword;
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    //insert into Db
    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      role,
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
};

//login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // if user misses to fill password or email
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "please fill all the details",
    });
  }

  //check is user exist or not
  let user = await User.findOne({ email });
  if (user === null) {
    return res.status(400).json({
      success: false,
      message: "User does not exist",
    });
  }
  const playload = {
    email: user.email,
    id: user._id,
    role: user.role,
  };
  //verify plain password and hashedpassword
  if (await bcrypt.compare(password, user.password)) {
    //if matched generate jwt token
    let token = jwt.sign(playload, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });
    user = user.toObject();
    user.password = undefined;
    user.token = token;
    console.log(token);
    // console.log(user);
    // const options = {
    //   expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    // };
    res.cookie("token", token).status(200).json({
      success: true,
      token,
      user,
      message: "User Logged in successfully",
    });
  } else {
    return res.status(403).json({
      success: false,
      message: "Incorrect password",
    });
  }
};
