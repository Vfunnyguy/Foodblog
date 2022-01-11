"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const userControl_1 = __importDefault(require("../controller/userControl"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express.Router();
router.patch('/user', auth_1.default, userControl_1.default.updateUser);
router.patch('/reset_password', auth_1.default, userControl_1.default.resetPass);
router.get('/user/:id', userControl_1.default.getUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map