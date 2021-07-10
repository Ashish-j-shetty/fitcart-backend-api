const { Product } = require("../models/product.model");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to get the list of products",
      errMessage: err.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const product = new Product(newProduct);
    const savedProduct = await product.save();
    res.status(201).json({ success: true, product: savedProduct });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { getAllProducts, addProduct };
