const Product = require("../models/Product");

const getAllStaticProducts = async (req, res) => {
  const products = await Product.find({
    featured: true,
  });
  res.status(200).json({
    success: true,
    status: 200,
    message: "Retrieving all static products",
    nbHits: products.length,
    products,
  });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured == "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  console.log(queryObject);
  const product = await Product.find(queryObject);
  res.status(200).json({
    success: true,
    status: 200,
    message: "Retrieving all products",
    product,
    nbHits: product.length,
  });
};

module.exports = { getAllProducts, getAllStaticProducts };
