const express = require("express");
const fs = require("fs")
const validateToken = require("../middleware/validateToken");
const { getProducts, createProduct, getProduct, updateProduct, deleteProduct,  } = require("../controllers/productController");

const router = express.Router()

router.use(validateToken)
router.route("/get-products").get(getProducts)
router.route("/create-product").post(createProduct)
router.route("/get-product/:id").get(getProduct)
router.route("/update-product/:id").put(updateProduct)
router.route("/delete-product/:id").delete(deleteProduct)


module.exports=router;