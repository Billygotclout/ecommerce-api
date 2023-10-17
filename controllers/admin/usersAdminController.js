const asyncHandler = require("express-async-handler");
const User = require("../../models/User");
const logger = require("../../helpers/logger");

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  logger.info("All users Successfully gotten");
  return res.json(users);
});
const getAllSellers = asyncHandler(async (req, res, next) => {
  const customers = await User.find({ role: "seller" });
  logger.info("All users that are sellers successfully gotten");
  res.json(customers);
});

module.exports = { getAllUsers, getAllSellers };
