const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: "UserId is required for wishlist",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("wishlist", wishlistSchema);

module.exports = { Wishlist };
