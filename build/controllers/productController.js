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
exports.uploadImage = exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAllProducts = exports.createProduct = void 0;
var http_status_codes_1 = require("http-status-codes");
var Product_1 = __importDefault(require("../models/Product"));
var errors_1 = require("../errors");
var path_1 = __importDefault(require("path"));
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.user.userId;
                    req.body.user = userId;
                    req.body.updatedBy = userId;
                    return [4 /*yield*/, Product_1.default.create(req.body)];
                case 1:
                    product = _a.sent();
                    res.status(http_status_codes_1.StatusCodes.CREATED).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.CREATED,
                        message: "Product created successfully",
                        product: product,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.createProduct = createProduct;
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Product_1.default.find({})];
                case 1:
                    products = _a.sent();
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Products retrieved successfully",
                        products: products,
                        count: products.length,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getAllProducts = getAllProducts;
function getSingleProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, Product_1.default.findOne({ _id: id }).populate("reviews")];
                case 1:
                    product = _a.sent();
                    if (!product) {
                        throw new errors_1.NotFoundError("Product with id ".concat(id, " not found"));
                    }
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Product retrieved successfully",
                        product: product,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getSingleProduct = getSingleProduct;
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    req.body.updatedBy = req.user.userId;
                    return [4 /*yield*/, Product_1.default.findOneAndUpdate({ _id: id }, req.body, {
                            new: true,
                            runValidators: true,
                        })];
                case 1:
                    product = _a.sent();
                    if (!product) {
                        throw new errors_1.NotFoundError("Product with id ".concat(id, " not found"));
                    }
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Product updated successfully",
                        product: product,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateProduct = updateProduct;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, Product_1.default.findOne({ _id: id })];
                case 1:
                    product = _a.sent();
                    if (!product) {
                        throw new errors_1.NotFoundError("Not product found with id ".concat(id));
                    }
                    return [4 /*yield*/, product.deleteOne()];
                case 2:
                    _a.sent();
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Product deleted successfully",
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteProduct = deleteProduct;
function uploadImage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var productImage, maxSize, imagePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.files) {
                        throw new errors_1.BadRequestError("No file uploaded");
                    }
                    productImage = Array.isArray(req.files.image)
                        ? req.files.image[0]
                        : req.files.image;
                    if (!productImage.mimetype.startsWith("image")) {
                        throw new errors_1.BadRequestError("Please upload only images");
                    }
                    maxSize = 1024 * 1024;
                    if (productImage.size > maxSize) {
                        throw new errors_1.BadRequestError("Please upload image smaller than 1MB");
                    }
                    imagePath = path_1.default.join(__dirname, "../public/uploads/" + "".concat(productImage.name));
                    return [4 /*yield*/, productImage.mv(imagePath)];
                case 1:
                    _a.sent();
                    res.status(http_status_codes_1.StatusCodes.OK).json({
                        success: true,
                        status: http_status_codes_1.StatusCodes.OK,
                        message: "Image uploaded successfully",
                        image: "/uploads/".concat(productImage.name),
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.uploadImage = uploadImage;
