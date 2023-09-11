const express = require("express");
const fs = require("fs");
const validateToken = require("../middleware/validateToken");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} = require("../controllers/productController");
const {
  addToCart,
  viewCart,
  deleteCart,
} = require("../controllers/cartController");
const multer = require("multer");
const pay = require("../controllers/paymentController");
const {
  addToWishlist,
  viewWishlist,
} = require("../controllers/wishlistController");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.use(validateToken);

router.route("/get-products").get(getProducts);
router.post("/create-product", upload.single("image"), createProduct);
router.route("/get-product/:id").get(getProduct);
router.route("/update-product/:id").put(updateProduct);
router.route("/delete-product/:id").delete(deleteProduct);
router.route("/add-to-cart").post(addToCart);
router.route("/view-cart").get(viewCart);
router.route("/delete-cart/:id").delete(deleteCart);
router.route("/search").get(searchProduct);
router.route("/pay").post(pay);
router.route("/add-to-wishlist/:id").post(addToWishlist);
router.route("/view-wishlist").get(viewWishlist);

module.exports = router;
