const mongoose = require("mongoose");
const { Schema } = mongoose;
const { fakeProductsData } = require("./fakeData");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: "Product name is required",
    },
    image: String,
    price: { type: Number, required: "Product price is required" },
    inStock: Boolean,
    fastDelivery: Boolean,
    cashOnDelivery: Boolean,
    rating: Number,
    discount: Number,
    category: String,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", ProductSchema);

async function populateProductColletion() {
  try {
    fakeProductsData.forEach(async (product) => {
      const dataItem = new Product(product);
      const savedItem = await dataItem.save();
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = { Product, populateProductColletion };
