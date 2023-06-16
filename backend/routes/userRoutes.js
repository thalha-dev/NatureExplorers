const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  refreshAccessToken,
} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refreshAccessToken", refreshAccessToken);

module.exports = router;
