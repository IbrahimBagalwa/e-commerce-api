import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    tax: {
      type: Number,
      reequired: true,
    },
    shippingFree: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    cartItems: [],
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "cancelled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", OrderSchema);
