/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";

declare module "mongoose" {
  interface Document {
    constructor: {
      model(name: string): mongoose.Model<any>;
      calculateAverageRating(productId: any): Promise<void>;
    };
  }
}
