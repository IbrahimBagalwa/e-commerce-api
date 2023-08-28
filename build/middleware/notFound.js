"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
function notFoundMiddleware(req, res) {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        status: http_status_codes_1.StatusCodes.NOT_FOUND,
        message: "Route provided: ".concat(req.method, " = ").concat(req.protocol, "://").concat(req.headers.host).concat(req.originalUrl, " is not found"),
    });
}
exports.default = notFoundMiddleware;
