const express = require("express")
const validateToken = require("../middleware/validateToken")

const {viewOrders, createOrder, deleteOrder} = require("../controllers/orderController")



const router = express.Router()
router.use(validateToken)
router.route("/view-orders").get(viewOrders)
router.route("/create-order").post(createOrder)
router.route("/delete-order/:id").delete(deleteOrder)


module.exports=router