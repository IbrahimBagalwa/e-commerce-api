const notFound = (req, res) => {
  return res.status(404).json({
    success: false,
    status: 404,
    message: `${req.method}=${req.protocol}://${req.hostname}${req.originalUrl}`,
  });
};

module.exports = notFound;
