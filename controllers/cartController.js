const Product = require("../models/Product");
let cartItems = [];

const addToCart = async (req, res) => {
  const newItem = await Product.findById(req.params.id);
  cartItems.push(newItem);

  res.status(200).json({ message: "Item added to cart" });
};
const viewCart = (req,res)=>{
res.status(200).json(cartItems)
}

const deleteCart=async(req,res)=>{
    const itemId = await Product.findById(req.params.id);
    cartItems= cartItems.filter(item=> item.id!== itemId)
    console.log(cartItems);
    res.status(200).json({message: "Item removed from cart"})
}
module.exports = { addToCart, viewCart,deleteCart };
