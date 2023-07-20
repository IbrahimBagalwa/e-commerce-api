require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./db/connect");
const productRouter = require("./routes/product");

app.use(express.json());
const PORT = process.env.PORT || 8900;

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, status: 200, message: "Welcome to the store api" });
});
app.use("/api/v1/products", productRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
