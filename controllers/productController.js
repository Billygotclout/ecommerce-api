const Product = require("../models/Product");

const getProducts = async (req, res) => {
  const product = await Product.find({ user_id: req.user.id });
  res
    .status(201)
    .json({ message: "Products Succesfully Fetched", data: product });
};
const createProduct = async (req, res) => {
  const { title, description, price } = req.body;
  if (!title || !description || !price) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const product = await Product.create({
    user_id: req.user.id,
    title,
    description,
    price,
  });
  res.status(201).json({
    message: "Product successfully created",
    data: product,
  });
};
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("product not found");
    }
    res.status(200).json({
      message: "Success",
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("product not found");
  }
  if (product.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("NOT ALLOWED");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    message: "Successfully Updated Product",
    data: updatedProduct,
  });
};
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("product not found");
  }
  if (product.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("NOT ALLOWED");
  }
  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: "Successfully Deleted Product",
  });
};
module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};