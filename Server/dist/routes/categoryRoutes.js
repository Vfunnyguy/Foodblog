"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryControl_1 = __importDefault(require("../controller/categoryControl"));
const auth_1 = __importDefault(require("../middleware/auth"));
const dinhtuyen = express_1.default.Router();
dinhtuyen.route('/category')
    .get(categoryControl_1.default.getCategory)
    .post(auth_1.default, categoryControl_1.default.createCategory);
dinhtuyen.route('/category/:id')
    .patch(auth_1.default, categoryControl_1.default.updateCategory)
    .delete(auth_1.default, categoryControl_1.default.deleteCategory);
exports.default = dinhtuyen;
//# sourceMappingURL=categoryRoutes.js.map