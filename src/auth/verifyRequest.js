const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

function verifyRequest(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ success: false, message: "Invalid user" });
  }
  try {
    let splitToken = token.split(" ")[1];

    const decode = jwt.verify(splitToken, secret);
    req.user = {
      userId: decode.userId,
    };
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Invalid token" });
  }
}

module.exports = verifyRequest;
