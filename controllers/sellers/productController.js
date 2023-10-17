const logger = require("../../helpers/logger");
const Product = require("../../models/Product");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: "dgmd8bmgm",
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET_KEY}`,
});
const getProducts = async (req, res) => {
  const product = await Product.find({ user_id: req.user.id });
  logger.info("All products successfully gotten.");
  res
    .status(200)
    .json({ message: "Products Succesfully Fetched", data: product });
};
const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    if (!title || !description || !price) {
      logger.error("All fields are required");
      res.status(400);
      throw new Error("All fields are required");
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    // remove file from server
    fs.unlink(`${req.file.path}`, (err) => {
      if (err) console.log(err);
    });

    const image = result.secure_url;
    const product = await Product.create({
      user_id: req.user.id,
      title,
      description,
      price,
      image,
      category,
    });
    logger.info(`Product with id: 
    ${product._id} successfully created `);
    res.status(201).json({
      message: "Product successfully created",
      data: product,
    });
  } catch (error) {
    logger.error(error.message);
    console.log(error);
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Sorry, we couldn't find that product.");
    }
    res.status(200).json({
      message: "Product successfully fetched",
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    logger.error(`Product with id: ${req.params.id} not found.`);
    res.status(404);
    throw new Error("Sorry, we couldn't find that product.");
  }
  if (product.user_id.toString() !== req.user.id) {
    logger.error("User was not authorized");
    res.status(403);
    throw new Error(
      "Please contact your administrator for access permissions."
    );
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  logger.info(`Product with ${product._id} updated successfully`);
  res.status(200).json({
    message: "Successfully Updated Product",
    data: updatedProduct,
  });
};
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    logger.error(`Product with id: ${req.params.id} not found.`);
    res.status(404);
    throw new Error("Sorry, we couldn't find that product.");
  }
  if (product.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "Please contact your administrator for access permissions."
    );
  }
  await Product.deleteOne({ _id: req.params.id });
  logger.info(`Product with ${product._id} deleted successfully`);
  res.status(200).json({
    message: "Successfully Deleted Product",
  });
};
const searchProduct = async (req, res) => {
  const keywords = req.query.keywords;
  const regex = new RegExp(keywords, "i");
  const product = await Product.find({ title: regex });
  if (!product) {
    logger.error(`Product with keywords: ${req.query.keywords} not found.`);
    res.status(404).json({
      error: "Couldn't find product",
    });
  }
  logger.info(`Returning products with keyword:${req.query.keywords} `);
  res.status(200).json(product);
};

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
