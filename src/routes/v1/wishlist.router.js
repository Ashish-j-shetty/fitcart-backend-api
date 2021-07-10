const express = require("express");
const router = express.Router();
const {
  getWishList,
  updateWishList,
} = require("../../controllers/wishlist.controller");

const verifyRequest = require("../../auth/verifyRequest");

router.use(verifyRequest);
router.route("/:userId").get(getWishList);

router.route("/:userId/:productId").post(updateWishList);
module.exports = router;
