"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var reviewController_1 = require("../controllers/reviewController");
var reviewRouter = express_1.default.Router();
reviewRouter.route("/").post(reviewController_1.createReview).get(reviewController_1.getAllReviews);
reviewRouter
    .route("/:id")
    .get(reviewController_1.getSingleReview)
    .delete(reviewController_1.deleteReview)
    .patch(reviewController_1.updateReview);
exports.default = reviewRouter;
