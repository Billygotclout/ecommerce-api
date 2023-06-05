const express = require("express");
const fs = require("fs")
const validateToken = require("../middleware/validateToken");
const { getProducts, createProduct, getProduct, updateProduct, deleteProduct, searchProduct,  } = require("../controllers/productController");
const { addToCart, viewCart, deleteCart } = require("../controllers/cartController");

const router = express.Router()

router.use(validateToken)
router.route("/get-products").get(getProducts)
router.route("/create-product").post(createProduct)
router.route("/get-product/:id").get(getProduct)
router.route("/update-product/:id").put(updateProduct)
router.route("/delete-product/:id").delete(deleteProduct)
router.route("/add-to-cart/:id").post(addToCart)
router.route("/view-cart").get(viewCart)
router.route("/delete-cart/:id").delete(deleteCart)
router.route("/search").get(searchProduct)

module.exports=router;