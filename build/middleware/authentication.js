"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var token_1 = require("../helpers/token");
var authenticatedUser = function (req, res, next) {
    var token = req.signedCookies.token;
    if (!token) {
        throw new errors_1.UnAuthenticatedError("Authentication failed");
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var _a = (0, token_1.verifyToken)(token), userId = _a.userId, username = _a.username, role = _a.role;
        req.user = { userId: userId, username: username, role: role };
        next();
    }
    catch (error) {
        throw new errors_1.UnAuthenticatedError("Authentication failed");
    }
};
exports.default = authenticatedUser;
