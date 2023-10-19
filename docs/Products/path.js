const createProduct = require("./createProduct");
const getAllProducts = require("./getAllProducts");
const getProduct = require("./getProduct");
const updateProduct = require("./updateProduct");
const deleteProduct = require("./deleteProduct");
const searchProduct = require("./searchProduct");

const productPath = {
  "/api/product/get-products": {
    get: getAllProducts,
  },
  "/api/product/create-product": {
    post: createProduct,
  },
  "/api/product/get-product/:id": {
    get: getProduct,
  },
  "/api/product/update-product/:id": {
    patch: updateProduct,
  },
  "/api/product/delete-product/:id": {
    delete: deleteProduct,
  },
  "/api/product/search-product?keyword=:product": {
    get: searchProduct,
  },
};

module.exports = productPath;
