import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function createProduct(req: Request, res: Response) {
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Product created successfully",
  });
}

function getAllProducts(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Products retrieved successfully",
  });
}

function getSingleProduct(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Product retrieved successfully",
  });
}

function updateProduct(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Product updated successfully",
  });
}

function deleteProduct(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Product deleted successfully",
  });
}

function uploadImage(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Image uploaded successfully",
  });
}
export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
