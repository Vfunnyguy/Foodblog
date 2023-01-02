"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogControl_1 = __importDefault(require("../controller/blogControl"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/blog', auth_1.default, blogControl_1.default.createBlog);
router.get('/home/getBlog', blogControl_1.default.getHomeBlog);
router.get('/getBlog/category/:id', blogControl_1.default.getBlogByCategory);
router.get('/getBlog/user/:id', blogControl_1.default.getBlogByUser);
router.route('/getBlog/:id')
    .get(blogControl_1.default.getBlog)
    .put(auth_1.default, blogControl_1.default.updateBlog)
    .delete(auth_1.default, blogControl_1.default.deleteBlog);
router.get('/search/blog', blogControl_1.default.searchBlog);
exports.default = router;
//# sourceMappingURL=blogRoutes.js.map