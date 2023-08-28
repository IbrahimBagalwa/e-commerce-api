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
var mongoose_1 = __importDefault(require("mongoose"));
var ProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide product name"],
        maxLength: [100, "Name cannot be more than 100 characters"],
    },
    price: {
        type: Number,
        required: [true, "Please provide product price"],
        default: 0,
    },
    description: {
        type: String,
        required: [true, "Please provide product description"],
        maxLength: [1000, "Description cannot be more than 1000 characters"],
    },
    image: {
        type: String,
        default: "/uploads/defaultImage.jpeg",
    },
    category: {
        type: String,
        required: [true, "Please provide product category"],
        enum: ["office", "kitchen", "bedroom"],
    },
    company: {
        type: String,
        required: [true, "Please provide company"],
        enum: {
            values: ["ikea", "liddy", "marcos"],
            message: "{VALUE} company is not supported",
        },
    },
    colors: {
        type: [String],
        default: ["#222"],
        required: true,
    },
    featured: {
        type: Boolean,
        deafult: false,
    },
    freeShipping: {
        type: Boolean,
        default: false,
    },
    inventory: {
        type: Number,
        required: [true, "Please provide product price"],
        default: 0,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
    updatedBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
ProductSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "product",
    justOne: false,
});
ProductSchema.pre("deleteOne", { document: true, query: false }, function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.constructor.model("Review").deleteMany({ product: this._id })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = mongoose_1.default.model("Product", ProductSchema);
