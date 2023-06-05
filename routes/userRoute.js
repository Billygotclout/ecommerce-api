const express = require("express");
const { register, login, currentUser } = require("../controllers/authController");
const validateToken = require("../middleware/validateToken");


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.get("/current-user",validateToken, currentUser);
module.exports = router;
