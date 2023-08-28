"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var notFound_1 = __importDefault(require("./middleware/notFound"));
var errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
var dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
dotenv_1.default.config();
var morgan_1 = __importDefault(require("morgan"));
var authRoute_1 = __importDefault(require("./routes/authRoute"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var userRoute_1 = __importDefault(require("./routes/userRoute"));
var authentication_1 = __importDefault(require("./middleware/authentication"));
var productRoute_1 = __importDefault(require("./routes/productRoute"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var reviewRoute_1 = __importDefault(require("./routes/reviewRoute"));
var orderRoute_1 = __importDefault(require("./routes/orderRoute"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var xss_clean_1 = __importDefault(require("xss-clean"));
var express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
var app = (0, express_1.default)();
app.set("trust proxy", 1);
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 60,
}));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, xss_clean_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET_KEY));
app.use(express_1.default.static("./public"));
app.use((0, express_fileupload_1.default)());
app.use("/api/v1/auth", authRoute_1.default);
app.use("/api/v1/users", authentication_1.default, userRoute_1.default);
app.use("/api/v1/products", authentication_1.default, productRoute_1.default);
app.use("/api/v1/reviews", authentication_1.default, reviewRoute_1.default);
app.use("/api/v1/orders", authentication_1.default, orderRoute_1.default);
app.use(notFound_1.default);
app.use(errorHandler_1.default);
exports.default = app;
