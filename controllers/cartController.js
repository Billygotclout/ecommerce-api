const Product = require("../models/Product");
const User = require("../models/User");

const addToCart = async (req, res) => {
  const user = await User.findById(req.user.id);
  const newItem = await Product.findById(req.params.id);

  const userCart = user.cart;
  userCart.push(newItem);

  await user.save();
  res.status(200).json({ message: "Item added to cart", data: userCart });
};

const viewCart = async (req, res) => {
  const user = await User.findById(req.user.id);
  const userCart = user.cart;
  res.status(200).json(userCart);
};

const deleteCart = async (req, res) => {
 try {
  const user = await User.findOne({ _id: req.user.id });

  // const product = await Product.findOne({ _id: req.params.id });
  

  user.cart = user.cart.filter((item) => item._id != req.params.id );

 
  await user.save();
  res.status(200).json({ message: "Item removed from cart" });
 } catch (error) {
  console.log(error);
 }

};

module.exports = { addToCart, viewCart, deleteCart };
