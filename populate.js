require("dotenv").config();

const connectDB = require("./src/db/connect");
const Product = require("./src/models/Product");

const jsonProduct = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProduct);
    console.log("Successfully");
  } catch (error) {
    console.log(error);
  }
};

start();
