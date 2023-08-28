/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import Product from "../models/Product";
import fakeStripePayment from "../helpers/fakeStripePayement";
import Order from "../models/Order";
import checkPermissions from "../helpers/checkPermissions";

async function createOder(req: Request, res: Response) {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError("No cart items provided");
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError(
      "Please provide both values tax and shipping free",
    );
  }
  let orderItems: any[] = [];
  let subtotal = 0;
  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new NotFoundError(`Not product found with id ${item.product}`);
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      name,
      price,
      amount: item.amount,
      product: _id,
      image,
    };
    orderItems = [...orderItems, singleOrderItem];
    subtotal += item.amount * price;
  }
  const total = tax + shippingFee + subtotal;

  const paymentIntent = await fakeStripePayment({
    amount: total,
    currency: "usd",
  });
  const order = await Order.create({
    tax,
    shippingFee,
    subtotal,
    total,
    orderItems,
    user: req.user.userId,
    clientSecret: paymentIntent.clientSecret,
  });
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Oder created successfully",
    order,
    clientSecret: order.clientSecret,
  });
}

async function getAllOrder(req: Request, res: Response) {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Oders retrieved successfully",
    orders,
    count: orders.length,
  });
}

async function getSingleOrder(req: Request, res: Response) {
  const orderId = req.params.id;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order found with id ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Oder retrieved successfully",
    order,
  });
}

async function getCurrentUserOrder(req: Request, res: Response) {
  const userId = req.user.userId;
  const myOrders = await Order.findOne({ user: userId });
  if (!myOrders) {
    throw new NotFoundError("You don't have any orders");
  }
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Current User Oder retrieved successfully",
    myOrders,
  });
}
async function updateOrder(req: Request, res: Response) {
  const orderId = req.params.id;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order found with id ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await order.save();
  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Oder updated successfully",
    order,
  });
}

export {
  createOder,
  getAllOrder,
  getCurrentUserOrder,
  updateOrder,
  getSingleOrder,
};
