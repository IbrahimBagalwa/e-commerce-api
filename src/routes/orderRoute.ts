import express from "express";
import {
  createOder,
  getAllOrder,
  getCurrentUserOrder,
  getSingleOrder,
  updateOrder,
} from "../controllers/orderController";
import authorizePermissions from "../middleware/authorizePermission";

const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(createOder)
  .get(authorizePermissions("admin", "owner"), getAllOrder);

orderRouter.route("/showAllMyOrders").get(getCurrentUserOrder);
orderRouter.route("/:id").patch(updateOrder).get(getSingleOrder);

export default orderRouter;
