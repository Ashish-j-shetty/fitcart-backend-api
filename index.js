require("dotenv").config();
const express = require("express");
const app = express();

console.log(process.env.PORT);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
