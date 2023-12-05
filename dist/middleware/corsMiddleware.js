"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const standardError_1 = __importDefault(require("../utils/constants/standardError"));
const origin = [
    "https://week15-api-avicena-dev.cyclic.cloud",
    "https://week15.avicena.dev",
    "http://localhost:5173",
];
const corsOptionsDelegate = (req, callback) => {
    const clientOrigin = origin.includes(req.header("Origin"));
    if (clientOrigin) {
        callback(null, {
            origin: true,
            methods: "GET,POST,DELETE,PUT,OPTIONS,HEAD",
        });
    }
    else {
        callback(new standardError_1.default({
            success: false,
            message: "Not allowed by CORS",
            status: 403,
        }));
    }
};
const corsMiddleware = (app) => {
    app.use((0, cors_1.default)());
};
exports.default = corsMiddleware;
