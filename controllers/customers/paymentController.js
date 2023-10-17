const logger = require("../../helpers/logger");
const CustomError = require("../../utils/CustomError");

const dotenv = require("dotenv").config();

const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);

const pay = async (req, res) => {
  const { amount, currency, source, description } = req.body;
  const charge = await stripe.charges.create({
    amount: amount,
    currency: currency,
    source: source,
    description: description,
  });

  if (!charge) {
    logger.error(`Charge failed for user: ${req.user.username}`);
    throw new CustomError("Charge failed ");
  }
  logger.info(
    `Charge successfully executedfor user with username: ${req.user.username}`
  );
  res.status(200).json({
    message: "Charge successfully executed",
    data: charge,
  });
};

module.exports = pay;
