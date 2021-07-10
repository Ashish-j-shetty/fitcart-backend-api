const { Wishlist } = require("../models/wishlist.model");

const updateWishList = async (req, res) => {
  const { type } = req.body;
  const { userId, productId } = req.params;
  try {
    const wishListItems =
      type === "REMOVE"
        ? await Wishlist.findOneAndRemove({
            userId: { _id: userId },
            product: { _id: productId },
          })
        : await new Wishlist({
            userId: { _id: userId },
            product: { _id: productId },
          }).save();

    res.json({
      success: true,
      wishListItems: wishListItems,
      message: "Item added to wishlist",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getWishList = async (req, res) => {
  const { userId } = req.params;
  try {
    const wishList = await Wishlist.find({ userId: { _id: userId } })
      .populate("product")
      .exec();
    res.json({ success: true, wishList: wishList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { updateWishList, getWishList };
