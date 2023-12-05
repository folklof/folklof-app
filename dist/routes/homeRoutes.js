"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json({
        message: "Folklof - The Story Teller Platform as an Innovative Educational Tool to Support the SDGs",
        copyright: '© 2023. HanCeSi Group.'
    });
});
exports.default = router;
