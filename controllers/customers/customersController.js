const logger = require("../../helpers/logger");
const Product = require("../../models/Product");
const asyncHandler = require("express-async-handler");

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  logger.info("All products successfully gotten");
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
    logger.info(`Getting all products with price: ${category}`);
  }
  // filter products by or price
  if (price) {
    products = await Product.find({
      price: price,
    });
    logger.info(`Getting all products with price: ${price}`);
  }

  res.json({
    message: `Showing all products with filter: ${category || price}`,
    data: products,
  });
});

module.exports = { getAllProducts, filterProducts };
