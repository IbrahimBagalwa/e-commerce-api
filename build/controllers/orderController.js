"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleOrder = exports.updateOrder = exports.getCurrentUserOrder = exports.getAllOrder = exports.createOder = void 0;
var http_status_codes_1 = require("http-status-codes");
var errors_1 = require("../errors");
var Product_1 = __importDefault(require("../models/Product"));
var fakeStripePayement_1 = __importDefault(require("../helpers/fakeStripePayement"));
var Order_1 = __importDefault(require("../models/Order"));
var checkPermissions_1 = __importDefault(require("../helpers/checkPermissions"));
function createOder(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, cartItems, tax, shippingFee, orderItems, subtotal, _i, cartItems_1, item, dbProduct, name, price, image, _id, singleOrderItem, total, paymentIntent, order;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, cartItems = _a.items, tax = _a.tax, shippingFee = _a.shippingFee;
                    if (!cartItems || cartItems.length < 1) {
                        throw new errors_1.BadRequestError("No cart items provided");
                    }
                    if (!tax || !shippingFee) {
                        throw new errors_1.BadRequestError("Please provide both values tax and shipping free");
                    }
                    orderItems = [];
                    subtotal = 0;
                    _i = 0, cartItems_1 = cartItems;
                    _b.label = 1;
                case 1:
                    if (!(_i < cartItems_1.length)) return [3 /*break*/, 4];
                    item = cartItems_1[_i];
                    return [4 /*yield*/, Product_1.default.findOne({ _id: item.product })];
                case 2:
                    dbProduct = _b.sent();
                    if (!dbProduct) {
                        throw new errors_1.NotFoundError("Not product found with id ".concat(item.product));
                    }
                    name = dbProduct.name, price = dbProduct.price, image = dbProduct.image, _id = dbProduct._id;
                    singleOrderItem = {
                        name: name,
                        price: price,
                        amount: item.amount,
                        product: _id,
                        image: image,
                    };
                    orderItems = __spreadArray(__spreadArray([], orderItems, true), [singleOrderItem], false);
                    subtotal += item.amount * price;
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    total = tax + shippingFee + subtotal;
                    return [4 /*yield*/, (0, fakeStripePayement_1.default)({
                            amount: total,
                            currency: "usd",
                        })];
                case 5:
                    paymentIntent = _b.sent();
                    return [4 /*yield*/, Order_1.default.create({
                            tax: tax,
                            shippingFee: shippingFee,
                            subtotal: subtotal,
                            total: total,
                            orderItems: orderItems,
                            user: req.user.userId,
                            clientSecret: paymentIntent.clientSecret,
                        })];
                case 6:
                    order = _b.sent();
                    res.status(http_status_codes_1.StatusCodes.CREATED).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.CREATED,
                        message: "Oder created successfully",
                        order: order,
                        clientSecret: order.clientSecret,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.createOder = createOder;
function getAllOrder(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Order_1.default.find({})];
                case 1:
                    orders = _a.sent();
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Oders retrieved successfully",
                        orders: orders,
                        count: orders.length,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getAllOrder = getAllOrder;
function getSingleOrder(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var orderId, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderId = req.params.id;
                    return [4 /*yield*/, Order_1.default.findOne({ _id: orderId })];
                case 1:
                    order = _a.sent();
                    if (!order) {
                        throw new errors_1.NotFoundError("No order found with id ".concat(orderId));
                    }
                    (0, checkPermissions_1.default)(req.user, order.user);
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Oder retrieved successfully",
                        order: order,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getSingleOrder = getSingleOrder;
function getCurrentUserOrder(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, myOrders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.user.userId;
                    return [4 /*yield*/, Order_1.default.findOne({ user: userId })];
                case 1:
                    myOrders = _a.sent();
                    if (!myOrders) {
                        throw new errors_1.NotFoundError("You don't have any orders");
                    }
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Current User Oder retrieved successfully",
                        myOrders: myOrders,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getCurrentUserOrder = getCurrentUserOrder;
function updateOrder(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var orderId, paymentIntentId, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderId = req.params.id;
                    paymentIntentId = req.body.paymentIntentId;
                    return [4 /*yield*/, Order_1.default.findOne({ _id: orderId })];
                case 1:
                    order = _a.sent();
                    if (!order) {
                        throw new errors_1.NotFoundError("No order found with id ".concat(orderId));
                    }
                    (0, checkPermissions_1.default)(req.user, order.user);
                    order.paymentIntentId = paymentIntentId;
                    order.status = "paid";
                    return [4 /*yield*/, order.save()];
                case 2:
                    _a.sent();
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Oder updated successfully",
                        order: order,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateOrder = updateOrder;
