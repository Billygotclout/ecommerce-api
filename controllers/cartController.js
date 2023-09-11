const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

const addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }
  const user = await User.findById(req.user.id);
  const cart = await Cart.findOne({ product_id });
  if (cart) {
    const cartQuantity = (cart.quantity += quantity);
    await cart.save();
    res.status(200).json({ message: "Item added to cart", data: cart });
  } else {
    const carte = await Cart.create({
      product_id,
      quantity,
      user_id: user._id,
    });

    res.status(200).json({ message: "Item added to cart", data: carte });
  }
};

const viewCart = async (req, res) => {
  const user = await User.findById(req.user.id);
  const cart = await Cart.find({ user_id: user._id }).populate("product_id");
  if (!cart) {
    res.status(404);
    throw new Error("Cart is empty");
  }
  res.status(200).json({ message: "Cart", data: cart });
};

const deleteCart = async (req, res) => {
  try {
    // delete item from cart
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      res.status(404);
      throw new Error("Cart is empty");
    }
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item removed from cart", data: cart });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addToCart, viewCart, deleteCart };
