require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { initializeDBConnection } = require("./src/db/db.connect");
const productRouter = require("./src/routes/v1/products.router");
const wishlistRouter = require("./src/routes/v1/wishlist.router");
const userRouter = require("./src/routes/v1/user.router");
const cartRouter = require("./src/routes/v1/cart.router");
const { populateProductColletion } = require("./src/models/product.model");
const { errorHandler } = require("./src/middlewares/error-handler-middleware");
const {
  routeNotFound,
} = require("./src/middlewares/route-not-found-middleware");
const app = express();

const PORT = 3005;

app.use(express.json());
app.use(cors());

/**
 * Db connection keep It in the first line
 */
(async () => {
  await initializeDBConnection();
})();

/**
 * this is the one time load of datato the product collection.
 */
//populateProductColletion();

app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("<h2>This is a home page of expess server</h2>");
});

/**
 * 404 route not found handler
 * Do not move
 * should be the at last of all other routes.
 */

app.use(routeNotFound);

/**
 * Error Hanlder , Do not move the middeleware
 * This middle ware should be the last .
 */
app.use(errorHandler);

app.listen(process.env.PORT || PORT, () => {
  console.log(`server started at port ${PORT}`);
});
