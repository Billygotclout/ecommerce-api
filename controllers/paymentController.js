const dotenv = require("dotenv").config();

const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);

const pay = async (req, res) => {
    const {amount, currency, source, description}= req.body
  const charge = await stripe.charges.create({
    amount: amount,
    currency: currency,
    source: source,
    description: description,
  });
  if (!charge) {
    res.status(400);
    res.json({
      message: "Charge failed",
    });
  }
  res.status(200).json({
    message: "Charge successfully executed",
    data: charge,
  });
};

module.exports=pay