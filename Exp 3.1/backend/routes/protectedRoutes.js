const express = require("express");
const authenticateToken = require("../middleware/auth");
const authorizeRoles = require("../middleware/authorizeRole");

const router = express.Router();

router.get("/dashboard", authenticateToken, (req, res) => {
  return res.status(200).json({
    message: "Welcome to the dashboard",
    user: req.user
  });
});

router.get("/admin", authenticateToken, authorizeRoles("admin"), (req, res) => {
  return res.status(200).json({
    message: "Welcome to the admin panel",
    user: req.user
  });
});

module.exports = router;
