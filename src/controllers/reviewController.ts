import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Product";
import Review from "../models/Review";
import { BadRequestError, NotFoundError } from "../errors";
import checkPermissions from "../helpers/checkPermissions";

async function createReview(req: Request, res: Response) {
  const { product: productId } = req.body;
  const { userId } = req.user;
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new NotFoundError(`Product with id ${productId} not found`);
  }

  const alreadySubmittedReview = await Review.findOne({
    product: productId,
    user: userId,
  });

  if (alreadySubmittedReview) {
    throw new BadRequestError("Already submitted review for this product");
  }

  req.body.user = userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Review created successfully",
    review,
  });
}

async function getAllReviews(req: Request, res: Response) {
  const reviews = await Review.find({})
    .populate({
      path: "product",
      select: "name price category company",
    })
    .populate({ path: "user", select: "username" });
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Reviews Retrieved successfully",
    reviews,
    count: reviews.length,
  });
}

async function getSingleReview(req: Request, res: Response) {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId })
    .populate({
      path: "product",
      select: "name price category company",
    })
    .populate({ path: "user", select: "username" });
  if (!review) {
    throw new NotFoundError(`No review found with this id :${reviewId}`);
  }
  checkPermissions(req.user, review.user);
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Review Retrieved successfully",
    review,
  });
}

async function updateReview(req: Request, res: Response) {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`No review found with this id :${reviewId}`);
  }

  checkPermissions(req.user, review.user);
  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Review updated successfully",
    review,
  });
}

async function deleteReview(req: Request, res: Response) {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`No review found with this id :${reviewId}`);
  }

  checkPermissions(req.user, review.user);
  await review.deleteOne();
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Review deleted successfully",
  });
}

async function getSingleProductReview(req: Request, res: Response) {
  const { id: productId } = req.params;
  const review = await Review.find({ product: productId });

  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Review Retrieved successfully",
    review,
    count: review.length,
  });
}

export {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReview,
};
