"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Hay tao mot chu de"],
        trim: true,
        unique: true,
        maxlength: [55, "Ten chu de gioi han trong 55 ky tu"],
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("categories", categorySchema);
//# sourceMappingURL=categoryModel.js.map