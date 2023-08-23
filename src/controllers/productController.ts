import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Product";

async function createProduct(req: Request, res: Response) {
  const { userId } = req.user;
  req.body.user = userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Product created successfully",
    product,
  });
}

async function getAllProducts(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Products retrieved successfully",
  });
}

async function getSingleProduct(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Product retrieved successfully",
  });
}

async function updateProduct(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Product updated successfully",
  });
}

async function deleteProduct(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Product deleted successfully",
  });
}

async function uploadImage(req: Request, res: Response) {
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
