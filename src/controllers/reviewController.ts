import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

async function createReview(req: Request, res: Response) {
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Review created successfully",
  });
}

async function getAllReviews(req: Request, res: Response) {
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Reviews Retrieved successfully",
  });
}

async function getSingleReview(req: Request, res: Response) {
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Review Retrieved successfully",
  });
}

async function updateReview(req: Request, res: Response) {
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Review updated successfully",
  });
}

async function deleteReview(req: Request, res: Response) {
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Review deleted successfully",
  });
}

export {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
