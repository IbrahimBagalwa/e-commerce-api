"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var orderController_1 = require("../controllers/orderController");
var authorizePermission_1 = __importDefault(require("../middleware/authorizePermission"));
var orderRouter = express_1.default.Router();
orderRouter
    .route("/")
    .post(orderController_1.createOder)
    .get((0, authorizePermission_1.default)("admin", "owner"), orderController_1.getAllOrder);
orderRouter.route("/showAllMyOrders").get(orderController_1.getCurrentUserOrder);
orderRouter.route("/:id").patch(orderController_1.updateOrder).get(orderController_1.getSingleOrder);
exports.default = orderRouter;
