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
} = require("../controllers/owners/productController");

const multer = require("multer");
const pay = require("../controllers/paymentController");
const {
  addToWishlist,
  viewWishlist,
} = require("../controllers/wishlistController");
const {
  getAllProducts,
  filterProducts,
} = require("../controllers/customers/customersController");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/get-all-products").get(getAllProducts);
router.route("/filter").get(filterProducts);
router.route("/view-wishlist").get(viewWishlist);
router.use(validateToken);

router.route("/get-products").get(getProducts);
router.post("/create-product", upload.single("image"), createProduct);
router.route("/get-product/:id").get(getProduct);
router.route("/update-product/:id").patch(updateProduct);
router.route("/delete-product/:id").delete(deleteProduct);
router.route("/search").get(searchProduct);
router.route("/pay").post(pay);
router.route("/add-to-wishlist/:id").post(addToWishlist);

module.exports = router;
