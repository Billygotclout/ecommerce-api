const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  user_id: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});
module.exports=mongoose.model("Product", productSchema)
