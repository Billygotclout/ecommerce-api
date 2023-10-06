const Product = require("../../models/Product");
const User = require("../../models/User");

const addToWishlist = async (req, res) => {
  const user = await User.findById(req.user.id);
  const newItem = await Product.findById(req.params.id);

  const userWishlist = user.wishlist;
  userWishlist.push(newItem);

  await user.save();
  res
    .status(200)
    .json({ message: "Item added to Wishlist", data: userWishlist });
};
const viewWishlist = async (req, res) => {
  const user = await User.findById(req.params.id);
  const userWishlist = user.wishlist;
  res.status(200).json(userWishlist);
};

module.exports = { addToWishlist, viewWishlist };
