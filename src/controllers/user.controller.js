const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const token = jwt.sign({ userId: user._id }, secret);
        return res.json({
          success: true,
          user: { name: user.name, email: user.email, userId: user._id },
          message: "Login successful",
          token,
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "wrong password or email" });
      }
    } else {
      res.status(401).json({ success: false, message: "No user found" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.json({
        success: false,
        message: "This email id is already registered with us",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, secret, {
      expiresIn: "30d",
    });

    res.json({
      success: true,
      user: {
        name: savedUser.name,
        email: savedUser.email,
        userId: savedUser._id,
      },

      token,
      message: "Singed up successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err.message,
    });
  }
};

module.exports = { login, signup };
