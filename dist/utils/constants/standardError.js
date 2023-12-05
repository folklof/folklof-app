"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StandardError extends Error {
    constructor({ success, message, status, }) {
        super(message);
        this.success = success;
        this.status = status;
    }
}
exports.default = StandardError;
