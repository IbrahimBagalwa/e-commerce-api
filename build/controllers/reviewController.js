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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleProductReview = exports.deleteReview = exports.updateReview = exports.getSingleReview = exports.getAllReviews = exports.createReview = void 0;
var http_status_codes_1 = require("http-status-codes");
var Product_1 = __importDefault(require("../models/Product"));
var Review_1 = __importDefault(require("../models/Review"));
var errors_1 = require("../errors");
var checkPermissions_1 = __importDefault(require("../helpers/checkPermissions"));
function createReview(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var productId, userId, isValidProduct, alreadySubmittedReview, review;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productId = req.body.product;
                    userId = req.user.userId;
                    return [4 /*yield*/, Product_1.default.findOne({ _id: productId })];
                case 1:
                    isValidProduct = _a.sent();
                    if (!isValidProduct) {
                        throw new errors_1.NotFoundError("Product with id ".concat(productId, " not found"));
                    }
                    return [4 /*yield*/, Review_1.default.findOne({
                            product: productId,
                            user: userId,
                        })];
                case 2:
                    alreadySubmittedReview = _a.sent();
                    if (alreadySubmittedReview) {
                        throw new errors_1.BadRequestError("Already submitted review for this product");
                    }
                    req.body.user = userId;
                    return [4 /*yield*/, Review_1.default.create(req.body)];
                case 3:
                    review = _a.sent();
                    res.status(http_status_codes_1.StatusCodes.CREATED).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.CREATED,
                        message: "Review created successfully",
                        review: review,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.createReview = createReview;
function getAllReviews(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var reviews;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Review_1.default.find({})
                        .populate({
                        path: "product",
                        select: "name price category company",
                    })
                        .populate({ path: "user", select: "username" })];
                case 1:
                    reviews = _a.sent();
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Reviews Retrieved successfully",
                        reviews: reviews,
                        count: reviews.length,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getAllReviews = getAllReviews;
function getSingleReview(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var reviewId, review;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reviewId = req.params.id;
                    return [4 /*yield*/, Review_1.default.findOne({ _id: reviewId })
                            .populate({
                            path: "product",
                            select: "name price category company",
                        })
                            .populate({ path: "user", select: "username" })];
                case 1:
                    review = _a.sent();
                    if (!review) {
                        throw new errors_1.NotFoundError("No review found with this id :".concat(reviewId));
                    }
                    (0, checkPermissions_1.default)(req.user, review.user);
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Review Retrieved successfully",
                        review: review,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getSingleReview = getSingleReview;
function updateReview(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var reviewId, _a, rating, title, comment, review;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reviewId = req.params.id;
                    _a = req.body, rating = _a.rating, title = _a.title, comment = _a.comment;
                    return [4 /*yield*/, Review_1.default.findOne({ _id: reviewId })];
                case 1:
                    review = _b.sent();
                    if (!review) {
                        throw new errors_1.NotFoundError("No review found with this id :".concat(reviewId));
                    }
                    (0, checkPermissions_1.default)(req.user, review.user);
                    review.rating = rating;
                    review.title = title;
                    review.comment = comment;
                    return [4 /*yield*/, review.save()];
                case 2:
                    _b.sent();
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Review updated successfully",
                        review: review,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateReview = updateReview;
function deleteReview(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var reviewId, review;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reviewId = req.params.id;
                    return [4 /*yield*/, Review_1.default.findOne({ _id: reviewId })];
                case 1:
                    review = _a.sent();
                    if (!review) {
                        throw new errors_1.NotFoundError("No review found with this id :".concat(reviewId));
                    }
                    (0, checkPermissions_1.default)(req.user, review.user);
                    return [4 /*yield*/, review.deleteOne()];
                case 2:
                    _a.sent();
                    res.status(http_status_codes_1.StatusCodes.CREATED).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.CREATED,
                        message: "Review deleted successfully",
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteReview = deleteReview;
function getSingleProductReview(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var productId, review;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productId = req.params.id;
                    return [4 /*yield*/, Review_1.default.find({ product: productId })];
                case 1:
                    review = _a.sent();
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Review Retrieved successfully",
                        review: review,
                        count: review.length,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getSingleProductReview = getSingleProductReview;
