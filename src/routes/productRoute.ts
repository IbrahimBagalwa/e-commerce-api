import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from "../controllers/productController";
import authorizePermissions from "../middleware/authorizePermission";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(authorizePermissions("admin", "owner"), createProduct);
productRouter
  .route("/uploadImage")
  .post(authorizePermissions("admin", "owner"), uploadImage);
productRouter
  .route("/:id")
  .get(getSingleProduct)
  .delete(authorizePermissions("admin", "owner"), deleteProduct)
  .patch(authorizePermissions("admin", "owner"), updateProduct);

export default productRouter;
