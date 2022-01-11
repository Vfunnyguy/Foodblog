"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userControl = {
    updateUser: async (req, res) => {
        if (!req.user)
            return res.status(400).send({ msg: "Invalid" });
        try {
            const { avatar, name } = req.body;
            await userModel_1.default.findOneAndUpdate({ _id: req.user._id }, {
                avatar, name
            });
            res.send({ msg: 'Update Success' });
        }
        catch (err) {
            return res.status(500).send({ msg: err.message });
        }
    },
    resetPass: async (req, res) => {
        if (!req.user)
            return res.status(400).send({ msg: 'Invalid' });
        if (req.user.type !== 'register')
            return res.status(400).send({ msg: `Tài khoản đăng nhập bằng Facebook không thể thay đối thông tin` });
        try {
            const { password } = req.body;
            const passwordHash = await bcrypt_1.default.hash(password, 12);
            await userModel_1.default.findOneAndUpdate({ _id: req.user._id }, {
                password: passwordHash
            });
            res.send({ msg: 'Success reset password' });
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await userModel_1.default.findById(req.params.id).select('-password');
            res.send(user);
        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
};
exports.default = userControl;
//# sourceMappingURL=userControl.js.map