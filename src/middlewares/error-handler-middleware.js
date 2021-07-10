function errorHandler(err, req, res, next) {
  res
    .status(500)
    .json({ success: false, message: "A error has occured", error: err.msg });
}

module.exports = { errorHandler };
