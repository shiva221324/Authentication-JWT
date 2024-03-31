const express = require("express");
const router = express.Router();

const { login, signup } = require("../Controllers/Auth");

router.post("/login", login);
router.post("/signup", signup);

//protected routes for specific users to show specific things unsing middleware

const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Test successful",
  });
});

// Protected Route for Student
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Protected Route for Student",
  });
});

// Protected Route for Admin
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Protected Route for Admin",
  });
});

module.exports = router;
