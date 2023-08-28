"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorizedError = exports.UnAuthenticatedError = exports.NotFoundError = exports.CustomErrorApi = exports.BadRequestError = void 0;
var badRequest_1 = __importDefault(require("./badRequest"));
exports.BadRequestError = badRequest_1.default;
var customApiError_1 = __importDefault(require("./customApiError"));
exports.CustomErrorApi = customApiError_1.default;
var unAuthenticatedError_1 = __importDefault(require("./unAuthenticatedError"));
exports.UnAuthenticatedError = unAuthenticatedError_1.default;
var notfound_1 = __importDefault(require("./notfound"));
exports.NotFoundError = notfound_1.default;
var unAuthorizedError_1 = __importDefault(require("./unAuthorizedError"));
exports.UnAuthorizedError = unAuthorizedError_1.default;
