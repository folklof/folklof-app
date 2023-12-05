"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cspPolicyMiddleware(app) {
    app.use((req, res, next) => {
        res.setHeader("Content-Security-Policy", "script-src 'self' https://folklof.com");
        next();
    });
}
exports.default = cspPolicyMiddleware;
