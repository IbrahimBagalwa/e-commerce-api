const Product = require("../models/Product");

const getAllStaticProducts = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .select("name price")
    .limit(3)
    .sort("price");
  res.status(200).json({
    success: true,
    status: 200,
    message: "Retrieving all static products",
    nbHits: products.length,
    products,
  });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, numericFilters } = req.query;
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

  console.log(numericFilters);
  if (numericFilters) {
    const operatorOBJ = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regex = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorOBJ[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").map((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  console.log(queryObject);
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
