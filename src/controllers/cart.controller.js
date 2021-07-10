const { Cart } = require("../models/cart.model");

const addToCart = async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    const addedItem = await cartItem.save();
    res.json({ success: true, cart: addedItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const itemsIncart = await Cart.find({ userId: { _id: userId } })
      .populate("product")
      .exec();

    res.json({ success: true, cart: itemsIncart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const cart =
      quantity === 0
        ? await Cart.findOneAndRemove({
            userId: { _id: userId },
            product: { _id: productId },
          })
        : await Cart.findOneAndUpdate(
            {
              userId: { _id: userId },
              product: { _id: productId },
            },
            { quantity }
          );
    res.json({ success: true, cart: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getCart, updateCart, addToCart };
