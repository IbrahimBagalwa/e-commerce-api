"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var singleOrderShema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    product: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "Product",
        required: true,
    },
});
var OrderSchema = new mongoose_1.default.Schema({
    tax: {
        type: Number,
        reequired: true,
    },
    shippingFee: {
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
    orderItems: [singleOrderShema],
    status: {
        type: String,
        enum: ["pending", "failed", "paid", "delivered", "cancelled"],
        default: "pending",
    },
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    clientSecret: {
        type: String,
        required: true,
    },
    paymentIntentId: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Order", OrderSchema);
