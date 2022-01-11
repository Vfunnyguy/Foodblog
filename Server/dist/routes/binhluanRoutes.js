"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const binhluanControl_1 = __importDefault(require("../controller/binhluanControl"));
const auth_1 = __importDefault(require("../middleware/auth"));
const dinhtuyen = express_1.default.Router();
dinhtuyen.post('/comment', auth_1.default, binhluanControl_1.default.createComment);
dinhtuyen.get('/comment/blogs/:id', binhluanControl_1.default.getComment);
dinhtuyen.post('/reply_comment', auth_1.default, binhluanControl_1.default.replyComment);
dinhtuyen.patch('/comment/:id', auth_1.default, binhluanControl_1.default.updateComment);
dinhtuyen.delete('/comment/:id', auth_1.default, binhluanControl_1.default.deleteComment);
exports.default = dinhtuyen;
//# sourceMappingURL=binhluanRoutes.js.map