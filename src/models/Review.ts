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

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);
  try {
    const ProductModel = mongoose.model("Product");
    await ProductModel.findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      },
    );
  } catch (error) {
    throw new Error("error occurred");
  }
};

ReviewSchema.post("save", async function () {
  this.constructor.calculateAverageRating(this.product);
});
ReviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    this.constructor.calculateAverageRating(this.product);
  },
);
export default mongoose.model("Review", ReviewSchema);
