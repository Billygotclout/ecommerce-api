const express = require("express");
const {
  register,
  login,
  currentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const validateToken = require("../middleware/validateToken");
const roleChecker = require("../middleware/roleChecker");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/current-user", validateToken, currentUser);
router.use(validateToken);
router.route("/admin").get(roleChecker("admin"), (req, res) => {
  res.json("Admin");
});
module.exports = router;
