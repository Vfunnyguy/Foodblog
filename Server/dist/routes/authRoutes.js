"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const authControl_1 = __importDefault(require("../controller/authControl"));
const valid_1 = require("../middleware/valid");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express.Router();
router.post('/register', valid_1.validRegister, authControl_1.default.dangky);
router.post('/active', authControl_1.default.activeAccount);
router.post('/login', authControl_1.default.dangnhap);
router.post('/facebook_login', authControl_1.default.facebookLogin);
router.get('/logout', auth_1.default, authControl_1.default.dangxuat);
router.get('/refresh_token', authControl_1.default.refreshToken);
router.post('/forgot_password', authControl_1.default.quenPass);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map