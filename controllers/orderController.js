const Order = require("../models/Order");
const Product = require("../models/Product");

const viewOrders = async (req, res) => {
  const order = await Order.find({ user_id: req.user.id }).populate({
    path: "product_id",
    model: "Product",
  });
  res.status(200).json({ message: "Orders Successfully Fetched", data: order });
};
const createOrder = async (req, res) => {
  const { product_id } = req.body;
  const createdOrder = await Order.create({
    user_id: req.user.id,
    product_id,
  });
  if (!createdOrder) {
    res.status(400);
    throw new Error("Order not created, please try again");
  }
  res
    .status(201)
    .json({ message: "Order Successfully Created", data: createdOrder });
};
const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Sorry, we couldn't find that order");
  }
  if (order.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "Please contact your administrator for access permissions."
    );
  }
  await Order.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: "Successfully Deleted Order",
  });
};
module.exports = { viewOrders, createOrder, deleteOrder };
