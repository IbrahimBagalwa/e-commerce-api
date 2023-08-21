import validator from "validator";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export default mongoose.model("User", UserSchema);
