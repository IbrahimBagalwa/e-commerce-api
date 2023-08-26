import mongoose from "mongoose";

declare module "mongoose" {
  interface Document {
    constructor: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      model(name: string): mongoose.Model<any>;
    };
  }
}
