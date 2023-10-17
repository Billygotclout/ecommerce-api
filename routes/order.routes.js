const express = require("express");
const validateToken = require("../middleware/validateToken");

const {
  viewOrders,
  createOrder,
  deleteOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const roleChecker = require("../middleware/roleChecker");

const router = express.Router();
router.use(validateToken);
router.route("/view-orders").get(viewOrders);
router.route("/create-order").post(createOrder);
router.route("/update-order/:id").patch(updateOrderStatus);
router.use(roleChecker("admin"));
router.route("/delete-order/:id").delete(deleteOrder);

module.exports = router;
