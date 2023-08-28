"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var errors_1 = require("../errors");
var checkPermissions = function (requestUser, resourceUserId) {
    if (requestUser.role === "admin")
        return;
    if (requestUser.userId === resourceUserId.toString())
        return;
    throw new errors_1.UnAuthorizedError("Permission denied to access this route");
};
exports.default = checkPermissions;
