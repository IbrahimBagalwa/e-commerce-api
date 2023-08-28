"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = require("../controllers/authController");
var authRouter = express_1.default.Router();
authRouter.route("/register").post(authController_1.register);
authRouter.route("/login").post(authController_1.login);
authRouter.route("/logout").get(authController_1.logout);
exports.default = authRouter;
