const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ success: false, status: 500, message: err });
};

module.exports = errorHandler;
