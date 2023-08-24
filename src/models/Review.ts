import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      minLength: 1,
      maxLength: 5,
      required: [true, "Please provide rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "please provide a title"],
      maxLength: [100, "title cannot be greater than 100 characters"],
    },
    comment: {
      type: String,
      required: [true, "please provide a comment"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true },
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true }); // only one review per product per user

export default mongoose.model("Review", ReviewSchema);
