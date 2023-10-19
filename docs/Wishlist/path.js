const addToWishlist = require("./addToWishlist");
const viewWishlist = require("./viewWishlist");

const wishlistPath = {
  "/api/product/add-to-wishlist/:id": {
    post: addToWishlist,
  },
  "/api/product/view-wishlist": {
    get: viewWishlist,
  },
};
module.exports = wishlistPath;
