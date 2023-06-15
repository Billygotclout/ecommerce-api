const Product = require("../models/Product");
const User = require("../models/User");


const addToCart = async (req, res) => {
  const userCart = req.user.cart;
  const newItem = await Product.findById(req.params.id);
 userCart.push(newItem)


console.log(userCart);
 

  res.status(200).json({ message: "Item added to cart", data:newItem });

};
const viewCart = (req,res)=>{
res.status(200).json(req.user.cart)
}

const deleteCart=async(req,res)=>{
    const itemId = await Product.findById(req.params.id);
    const cartItems = req.user.cart
    cartItems= cartItems.filter(item=> item.id!== itemId)
 
    res.status(200).json({message: "Item removed from cart"})
}

module.exports = { addToCart, viewCart,deleteCart };
