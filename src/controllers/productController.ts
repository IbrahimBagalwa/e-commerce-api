import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Product";
import { BadRequestError, NotFoundError } from "../errors";

async function createProduct(req: Request, res: Response) {
  const { userId } = req.user;
  req.body.user = userId;
  req.body.updateBy = userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Product created successfully",
    product,
  });
}

async function getAllProducts(req: Request, res: Response) {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Products retrieved successfully",
    products,
    count: products.length,
  });
}

async function getSingleProduct(req: Request, res: Response) {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Product retrieved successfully",
    product,
  });
}

async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const { name, description, price, category, company, colors } = req.body;
  req.body.updateBy = req.user.userId;
  if (!name || !description || !price || !category || !company || !colors) {
    throw new BadRequestError("All fields must be provided");
  }
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Product updated successfully",
    product,
  });
}

async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;

  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    throw new NotFoundError(`Not product found with id {id}`);
  }

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
