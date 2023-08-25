import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../models/Product";
import { BadRequestError, NotFoundError } from "../errors";
import path from "path";

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
  const product = await Product.findOne({ _id: id }).populate("reviews");
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
  req.body.updateBy = req.user.userId;
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

  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new NotFoundError(`Not product found with id ${id}`);
  }
  await Product.deleteOne();
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Product deleted successfully",
  });
}

async function uploadImage(req: Request, res: Response) {
  if (!req.files) {
    throw new BadRequestError("No file uploaded");
  }
  const productImage = Array.isArray(req.files.image)
    ? req.files.image[0]
    : req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload only images");
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new BadRequestError("Please upload image smaller than 1MB");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`,
  );
  await productImage.mv(imagePath);

  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Image uploaded successfully",
    image: `/uploads/${productImage.name}`,
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
