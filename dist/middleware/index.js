"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParserMiddleware_1 = __importDefault(require("./bodyParserMiddleware"));
const helmetMiddleware_1 = __importDefault(require("./helmetMiddleware"));
const corsMiddleware_1 = __importDefault(require("./corsMiddleware"));
const morganMiddleware_1 = __importDefault(require("./morganMiddleware"));
const databaseMiddleware_1 = __importDefault(require("./databaseMiddleware"));
const cspPolicyMiddleware_1 = __importDefault(require("./cspPolicyMiddleware"));
const applyMiddleware = (app) => {
    (0, morganMiddleware_1.default)(app);
    (0, helmetMiddleware_1.default)(app);
    (0, bodyParserMiddleware_1.default)(app);
    (0, corsMiddleware_1.default)(app);
    (0, cspPolicyMiddleware_1.default)(app);
    app.use(databaseMiddleware_1.default);
};
exports.default = applyMiddleware;
