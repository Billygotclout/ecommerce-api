const express = require("express")
const validateToken = require("../middleware/validateToken")

const {viewOrders, createOrder} = require("../controllers/orderController")



const router = express.Router()
router.use(validateToken)
router.route("/view-orders").get(viewOrders)
router.route("/create-order").post(createOrder)


module.exports=router