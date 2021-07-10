const express = require("express");
const {
  getAllProducts,
  addProduct,
} = require("../../controllers/product.controller");
const router = express.Router();

router.route("/").get(getAllProducts).post(addProduct);

module.exports = router;
