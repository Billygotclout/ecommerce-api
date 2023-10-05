const Product = require("../../models/Product");
const asyncHandler = require("express-async-handler");

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  res.json({
    message: "Showing all products",
    data: products,
  });
});
// filter products by categories or price
const filterProducts = asyncHandler(async (req, res, next) => {
  let products;
  const { category, price } = req.query;
  if (category) {
    products = await Product.find({
      category: category,
    });
  }

  // filter products by or price
  if (price) {
    products = await Product.find({
      price: price,
    });
  }

  res.json({
    message: "Showing all products",
    data: products,
  });
});

module.exports = { getAllProducts, filterProducts };
