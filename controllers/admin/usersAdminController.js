const asyncHandler = require("express-async-handler");
const User = require("../../models/User");

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  return res.json(users);
});
const getAllCustomers = asyncHandler(async (req, res, next) => {
  const customers = await User.find({ role: "customer" });

  res.json(customers);
});

module.exports = { getAllUsers, getAllCustomers };
