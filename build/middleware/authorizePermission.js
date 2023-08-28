"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
var authorizePermissions = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return function (req, res, next) {
        var role = req.user.role;
        if (!roles.includes(role)) {
            throw new errors_1.UnAuthorizedError("Unauthorized to access this Route, Access denied");
        }
        next();
    };
};
exports.default = authorizePermissions;
