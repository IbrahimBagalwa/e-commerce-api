"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
function errorHandler(err, _req, res, _next) {
    var customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, please try again later.",
    };
    if (err.code && err.code === 11000) {
        customError.message = "Duplicate entered for ".concat(Object.keys(err.keyValue), ", field please choose another value");
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.name && err.name === "ValidationError") {
        customError.message = Object.values(err.errors)
            .map(function (item) { return item.message; })
            .join(" and ");
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.name && err.name === "CastError") {
        customError.message = "Invalid ID ".concat(err.value, " provided");
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    res.status(customError.statusCode).json({
        success: false,
        status: customError.statusCode,
        message: customError.message,
    });
}
exports.default = errorHandler;
