const mongoose = require("mongoose");
const dbURI = process.env.DB_URI;

async function initializeDBConnection() {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Mongoose connection established");
  } catch (error) {
    console.log("Mongoose connection failed", error);
  }
}

module.exports = { initializeDBConnection };
