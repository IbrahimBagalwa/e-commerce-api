"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controllers/userController");
var authorizePermission_1 = __importDefault(require("../middleware/authorizePermission"));
var userRouter = express_1.default.Router();
userRouter.route("/").get((0, authorizePermission_1.default)("admin", "owner"), userController_1.getAllUsers);
userRouter.route("/showMe").get(userController_1.showCurrentUser);
userRouter.route("/updateUser").patch(userController_1.updateUser);
userRouter.route("/updateUserPassword").patch(userController_1.updateUserPassword);
userRouter.route("/:id").get(userController_1.getSingleUser);
exports.default = userRouter;
