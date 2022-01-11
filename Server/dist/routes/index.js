"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./authRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const blogRoutes_1 = __importDefault(require("./blogRoutes"));
const binhluanRoutes_1 = __importDefault(require("./binhluanRoutes"));
const routes = [
    authRoutes_1.default,
    userRoutes_1.default,
    categoryRoutes_1.default,
    blogRoutes_1.default,
    binhluanRoutes_1.default
];
exports.default = routes;
//# sourceMappingURL=index.js.map