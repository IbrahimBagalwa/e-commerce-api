const Product = require("../models/Product");

const getAllStaticProducts = async (req, res) => {
  const products = await Product.find({
    featured: true,
  })
    .select("name price")
    .limit(3)
    .sort("name");
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
  let result = Product.find(queryObject);
  const page = Number(req.query) || 1;
  const limit = Number(req.query) || 2;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(skip);
  const product = await result;
  res.status(200).json({
    success: true,
    status: 200,
    message: "Retrieving all products",
    product,
    nbHits: product.length,
  });
};

module.exports = { getAllProducts, getAllStaticProducts };
