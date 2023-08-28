"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCookiesToResponse = exports.verifyToken = exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var errors_1 = require("../errors");
var _a = process.env, JWT_EXPIRE_IN_HRS = _a.JWT_EXPIRE_IN_HRS, JWT_SECRET_KEY = _a.JWT_SECRET_KEY;
var generateToken = function (payload) {
    if (typeof JWT_SECRET_KEY !== "string")
        throw new errors_1.BadRequestError("JWT secret key must be provided");
    var token = jsonwebtoken_1.default.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE_IN_HRS,
    });
    return token;
};
exports.generateToken = generateToken;
var verifyToken = function (token) {
    if (typeof JWT_SECRET_KEY !== "string")
        throw new errors_1.BadRequestError("JWT secret key must be provided");
    return jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
};
exports.verifyToken = verifyToken;
var attachCookiesToResponse = function (res, user) {
    var token = generateToken(user);
    var oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV !== "production",
        signed: true,
    });
};
exports.attachCookiesToResponse = attachCookiesToResponse;
