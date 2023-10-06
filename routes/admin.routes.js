const express = require("express");
const roleChecker = require("../middleware/roleChecker");
const {
  getAllUsers,
  getAllCustomers,
} = require("../controllers/admin/usersAdminController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();
router.use(validateToken, roleChecker("admin"));
router.route("/get-all-users").get(getAllUsers);
router.route("/get-all-customers").get(getAllCustomers);
module.exports = router;
