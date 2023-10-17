const Order = require("../models/Order");
const logger = require("../helpers/logger");
const CustomError = require("../utils/CustomError");

const viewOrders = async (req, res) => {
  const order = await Order.find({ user_id: req.user.id }).populate({
    path: "product_id",
    model: "Product",
  });
  logger.info("Orders have been successfully retrieved");
  res.status(200).json({ message: "Orders Successfully Fetched", data: order });
};
const createOrder = async (req, res) => {
  const { product_id } = req.body;
  const createdOrder = await Order.create({
    user_id: req.user.id,
    product_id,
  });
  if (!createdOrder) {
    logger.error("Order creation failed  successfully.");
    throw new CustomError("Order not created, please try again", 400);
  }
  logger.info(`Order with ${createdOrder._id} has been created successfully`);
  res
    .status(201)
    .json({ message: "Order Successfully Created", data: createdOrder });
};
const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new CustomError("Sorry, we couldn't find that order", 404);
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
const updateOrderStatus = async () => {
  const order = Order.findById(req.params.id);
  if (!order) {
    logger.error("Order could not be found");
    throw new CustomError("Sorry, we couldn't find that order", 404);
  }
  const updatedOrderStatus = await Order.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  logger.info(`Order with ${order._id} updated successfully`);
  res.status(200).json({
    message: `Order status is now ${updatedOrderStatus.status}`,
    data: updatedOrderStatus,
  });
};
module.exports = { viewOrders, createOrder, deleteOrder, updateOrderStatus };
