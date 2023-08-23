import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from "../controllers/productController";

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts).post(createProduct);
productRouter.route("/updateProduct").patch(updateProduct);
productRouter.route("/uploadImage").post(uploadImage);
productRouter.route("/:id").get(getSingleProduct).delete(deleteProduct);
