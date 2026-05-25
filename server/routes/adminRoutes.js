const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check admin credentials
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      role: "admin",
      username,
    },
    process.env.ADMIN_JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.json({
    success: true,
    token,
  });
});

module.exports = router;