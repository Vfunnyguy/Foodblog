"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token)
            return res.status(400).send({ msg: 'Invalid' });
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        if (!decoded)
            return res.status(400).send({ msg: 'Invalid' });
        const user = await userModel_1.default.findOne({ _id: decoded.id }).select('-password');
        if (!user)
            return res.status(400).json({ msg: "User does not exist." });
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(500).send({ msg: error.message });
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map