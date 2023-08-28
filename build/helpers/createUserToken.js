"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createUserToken = function (user) {
    return { username: user.username, userId: user._id, role: user.role };
};
exports.default = createUserToken;
