"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productController_1 = require("../controllers/productController");
var authorizePermission_1 = __importDefault(require("../middleware/authorizePermission"));
var reviewController_1 = require("../controllers/reviewController");
var productRouter = express_1.default.Router();
productRouter
    .route("/")
    .get(productController_1.getAllProducts)
    .post((0, authorizePermission_1.default)("admin", "owner"), productController_1.createProduct);
productRouter
    .route("/uploadImage")
    .post((0, authorizePermission_1.default)("admin", "owner"), productController_1.uploadImage);
productRouter
    .route("/:id")
    .get(productController_1.getSingleProduct)
    .delete((0, authorizePermission_1.default)("admin", "owner"), productController_1.deleteProduct)
    .patch((0, authorizePermission_1.default)("admin", "owner"), productController_1.updateProduct);
productRouter.route("/:id/reviews").get(reviewController_1.getSingleProductReview);
exports.default = productRouter;
