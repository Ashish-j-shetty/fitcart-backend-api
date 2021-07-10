function routeNotFound(req, res, next) {
  res.status(400).json({
    success: false,
    message: "The api route you are hitting is not found",
  });
}

module.exports = { routeNotFound };
