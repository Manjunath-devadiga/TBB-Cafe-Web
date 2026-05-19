const express = require("express");
const router = express.Router();

// simple login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    return res.json({
      success: true,
      token: "simple-admin-token"
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

module.exports = router;