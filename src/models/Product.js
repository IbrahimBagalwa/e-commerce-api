const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Product name is required"],
    minLength: 2,
    maxLength: 50,
  },
  price: {
    type: Number,
    require: [true, "Product price is required"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.3,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "caressa", "marcos", "liddy"],
      message: "{VALUE} is not supported",
    },
  },
});
module.exports = mongoose.model("Product", ProductSchema);
