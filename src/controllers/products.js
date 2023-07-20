const getAllProducts = (req, res) => {
  throw new Error("Testing the async wrapper erros package");
  res.status(200).json({
    success: true,
    status: 200,
    message: "Retrieving all products",
    data: "here",
  });
};
const getAllStaticProducts = (req, res) => {
  res.status(200).json({
    success: true,
    status: 200,
    message: "Retrieving all static products",
  });
};

module.exports = { getAllProducts, getAllStaticProducts };
