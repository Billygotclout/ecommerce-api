
const Order = require("../models/Order");
const Product = require("../models/Product");

const viewOrders = async (req, res) => {
  const order = await Order.find({user_id:req.user._id})
 

  // const product = await Product.find({_id:productId})
  // console.log(product);
  res.status(200).json({message: "Orders Successfully Fetched", data: order})
};
const createOrder=async (req,res)=>{
    const {product_id}= req.body;
    const createdOrder = Order.create({
      user_id: req.user._id,
      product_id
    })
    if (!createOrder) {
      res.status(400)
    throw new Error("Order not created, please try again")
    }
    res.status(201).json({message: "Order Successfully Created", data: createdOrder})
}
module.exports = { viewOrders,createOrder };
