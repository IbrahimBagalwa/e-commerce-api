import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from "../controllers/reviewController";

const reviewRouter = express.Router();

reviewRouter.route("/").post(createReview).get(getAllReviews);
reviewRouter
  .route("/:id")
  .get(getSingleReview)
  .delete(deleteReview)
  .patch(updateReview);

export default reviewRouter;
