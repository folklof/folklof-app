"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerAuthorization = exports.adminAuthorization = exports.userAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const standardError_1 = __importDefault(require("../utils/constants/standardError"));
const jwtConfig_1 = require("./config/jwtConfig");
const userAuthentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new standardError_1.default({
            success: false,
            status: 401,
            message: "Unauthorized",
        });
    }
    else {
        const token = authHeader.split(" ")[1];
        try {
            if (!jwtConfig_1.JWT_SIGN) {
                throw new Error("JWT_SIGN is not defined");
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, jwtConfig_1.JWT_SIGN);
            req.user = decodedToken;
            next();
        }
        catch (error) {
            next(error);
        }
    }
};
exports.userAuthentication = userAuthentication;
const authorizationMiddleware = (allowedRoles) => (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new standardError_1.default({
            success: false,
            status: 401,
            message: "Unauthorized",
        });
    }
    else {
        try {
            const token = authHeader.split(" ")[1];
            if (!jwtConfig_1.JWT_SIGN) {
                throw new Error("JWT_SIGN is not defined");
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, jwtConfig_1.JWT_SIGN);
            req.user = decodedToken;
            if (allowedRoles.includes(decodedToken.role)) {
                next();
            }
            else {
                throw new standardError_1.default({
                    success: false,
                    status: 403,
                    message: "Access Denied. You are not allowed to access this resource.",
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
};
const adminAuthorization = authorizationMiddleware(["admin", "manager"]);
exports.adminAuthorization = adminAuthorization;
const managerAuthorization = authorizationMiddleware(["manager"]);
exports.managerAuthorization = managerAuthorization;
