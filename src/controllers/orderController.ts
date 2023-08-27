import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

async function createOder(req: Request, res: Response) {
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Oder created successfully",
  });
}

async function getAllOrder(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Oders retrieved successfully",
  });
}

async function getSingleOrder(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Oder retrieved successfully",
  });
}

async function getCurrentUserOrder(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Oder retrieved successfully",
  });
}
async function updateOrder(req: Request, res: Response) {
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Oder retrieved successfully",
  });
}

export {
  createOder,
  getAllOrder,
  getCurrentUserOrder,
  updateOrder,
  getSingleOrder,
};
