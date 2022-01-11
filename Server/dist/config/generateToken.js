"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = exports.generateActiveToken = void 0;
const jwt = require("jsonwebtoken");
const generateActiveToken = (payload) => {
    return jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
        expiresIn: "5m",
    });
};
exports.generateActiveToken = generateActiveToken;
const generateAccessToken = (payload) => {
    return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: "15m",
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload, antwort) => {
    const refresh_token = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: "30d" });
    antwort.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return refresh_token;
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=generateToken.js.map