"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const blogModel_1 = __importDefault(require("../models/blogModel"));
const categoryControl = {
    createCategory: async (req, res) => {
        if (!req.user)
            return res.status(400).send({ msg: "Invalid" });
        if (req.user.role !== "admin")
            return res.status(400).send({ msg: "deo phai bo doi" });
        try {
            const name = req.body.name.toLowerCase();
            const newCategory = new categoryModel_1.default({ name });
            await newCategory.save();
            res.json({ newCategory });
        }
        catch (error) {
            let tinLoi;
            if (error.code === 11000) {
                tinLoi = Object.values(error.keyValue)[0] + "đã tồn  tại";
            }
            else {
                let name = Object.keys(error.error)[0];
                tinLoi = error.error[`${name}`].message;
            }
            return res.status(500).send({ msg: tinLoi });
        }
    },
    getCategory: async (_req, res) => {
        try {
            const categories = await categoryModel_1.default.find().sort("-createdAt");
            res.json({ categories });
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    },
    updateCategory: async (req, res) => {
        if (!req.user)
            return res.status(400).json({ msg: "Invalid Authentication." });
        if (req.user.role !== "admin")
            return res.status(400).json({ msg: "deo phai bo doi." });
        try {
            const category = await categoryModel_1.default.findOneAndUpdate({
                _id: req.params.id,
            }, { name: (req.body.name).toLowerCase() });
            res.send({ msg: "Cập nhập thành công!", category });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteCategory: async (req, res) => {
        if (!req.user)
            return res.status(400).json({ msg: "Invalid Authentication." });
        if (req.user.role !== "admin")
            return res.status(400).json({ msg: "Invalid Authentication." });
        try {
            const blog = await blogModel_1.default.findOne({ category: req.params.id });
            if (blog)
                return res.status(400).send({ msg: 'Không thể xóa vì đã có bài viết tồn tại ' });
            const category = await categoryModel_1.default.findByIdAndDelete(req.params.id);
            if (!category)
                return res.status(400).send({ msg: 'Thể loại không tồn tại ' });
            res.json({ msg: "Xóa thành công!", category });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};
exports.default = categoryControl;
//# sourceMappingURL=categoryControl.js.map