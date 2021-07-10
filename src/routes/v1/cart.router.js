const express = require("express");

const router = express.Router();
const verifyRequest = require("../../auth/verifyRequest");
const {
  getCart,
  updateCart,
  addToCart,
} = require("../../controllers/cart.controller");

router.use(verifyRequest);

router.route("/").post(addToCart);

router.route("/:userId").get(getCart);

router.route("/:userId/:productId").post(updateCart);

module.exports = router;
