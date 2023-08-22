import express from "express";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController";
const userRouter = express.Router();

userRouter.route("/").get(getAllUsers);
userRouter.route("/showMe").get(showCurrentUser);
userRouter.route("/updateUser").patch(updateUser);
userRouter.route("/updateUserPassword").patch(updateUserPassword);
userRouter.route("/:id").get(getSingleUser);

export default userRouter;
