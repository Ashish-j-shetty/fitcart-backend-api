const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    password: {
      type: String,
      required: "Please provide password",
    },
    email: {
      type: String,
      required: "Please provide the email",
      unique: true,
    },
    name: {
      type: String,
      required: "Please provide the name",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

module.exports = { User };
