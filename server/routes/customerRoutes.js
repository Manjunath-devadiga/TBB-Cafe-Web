const express = require("express");
const router = express.Router();

const {
  customerRegister,
  customerLogin,
} = require(
  "../controllers/customerController"
);
// REGISTER
router.post(
  "/register",
  customerRegister
);
// LOGIN
router.post(
  "/login",
  customerLogin
);

module.exports = router;