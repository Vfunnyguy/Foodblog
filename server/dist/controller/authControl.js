"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_1 = require("../config/generateToken");
const sendMail_1 = __importDefault(require("../config/sendMail"));
const valid_1 = require("../middleware/valid");
const node_fetch_1 = __importDefault(require("node-fetch"));
const authControl = {
    dangky: async (req, res) => {
        try {
            const { name, account, password } = req.body;
            const user = await userModel_1.default.findOne({ account });
            if (user)
                return res.status(400).send({ msg: "Email đã đươc sử dụng" });
            const passwordHash = await bcrypt_1.default.hash(password, 12);
            const newUser = { name, account, password: passwordHash };
            const active_token = (0, generateToken_1.generateActiveToken)({ newUser });
            const url = `${process.env.SERVER_URL}/active/${active_token}`;
            if ((0, valid_1.validateEmail)(account)) {
                (0, sendMail_1.default)(account, url, "Xác thực tài khoản ");
                return res.send({ msg: "Thành công!Hãy kiểm tra hòm thư của bạn" });
            }
            res.send({
                status: "OK",
                msg: "Register successfully",
                data: newUser,
                active_token,
            });
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    },
    activeAccount: async (req, res) => {
        try {
            const { active_token } = req.body;
            const decoded = (jsonwebtoken_1.default.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`));
            const { newUser } = decoded;
            if (!newUser)
                return res.status(400).send({ msg: "Lỗi xác thực" });
            const user = await userModel_1.default.findOne({ account: newUser.account });
            if (user)
                return res.status(400).send({ msg: "Tài khoản đã tồn tại" });
            const new_user = new userModel_1.default(newUser);
            await new_user.save();
            res.send({ msg: "Kích hoạt tài khoản thành công" });
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    },
    dangnhap: async (req, res) => {
        try {
            const { account, password } = req.body;
            const user = await userModel_1.default.findOne({ account });
            if (!user)
                return res.status(400).send({ msg: "Tài khoản không tồn tại" });
            loginUser(user, password, res);
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    },
    dangxuat: async (req, res) => {
        if (!req.user)
            return res.status(400).send({ msg: 'Invalid' });
        try {
            res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
            await userModel_1.default.findOneAndUpdate({ _id: req.user._id }, {
                rf_token: ''
            });
            return res.send("Đăng Xuất!");
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    },
    refreshToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token)
                return res.status(400).send({ msg: "Hãy đăng nhập ngay!" });
            const decoded = (jsonwebtoken_1.default.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`));
            if (!decoded.id)
                return res.status(400).send({ msg: "Hãy đăng nhập ngay!" });
            const user = await userModel_1.default.findById(decoded.id).select("-password +rf_token");
            if (!user)
                return res.status(400).send({ msg: "Tài khoản này không tồn tại" });
            if (rf_token !== user.rf_token)
                return res.status(400).send({ msg: "Hãy đăng nhập ngay!" });
            const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
            const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: user._id }, res);
            await userModel_1.default.findOneAndUpdate({ _id: user._id }, {
                rf_token: refresh_token
            });
            res.json({ access_token, user });
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    },
    facebookLogin: async (req, res) => {
        try {
            const { accessToken, userID } = req.body;
            const URL = `
        https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}
      `;
            const data = await (0, node_fetch_1.default)(URL)
                .then((res) => res.json())
                .then((res) => {
                return res;
            });
            const { email, name, picture } = data;
            const password = email + "your facebook secrect password";
            const passwordHash = await bcrypt_1.default.hash(password, 12);
            const user = await userModel_1.default.findOne({ account: email });
            if (user) {
                loginUser(user, password, res);
            }
            else {
                const user = {
                    name,
                    account: email,
                    password: passwordHash,
                    avatar: picture.data.url,
                    type: "login",
                };
                registerUser(user, res);
            }
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    },
    quenPass: async (req, res) => {
        try {
            const { account } = req.body;
            const user = await userModel_1.default.findOne({ account });
            if (!user)
                return res.status(400).send({ msg: "Tài khoản không tồn tại" });
            if (user.type !== 'register')
                return res.status(400).send({ msg: "tài khoản đăng nhập bằng facebook không thể thưc hiện chức năng này " });
            const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
            const url = `${process.env.SERVER_URL}/reset_password/${access_token}`;
            if ((0, valid_1.validateEmail)(account)) {
                (0, sendMail_1.default)(account, url, 'Quên mật khẩu?');
                return res.send({ msg: 'Thành công!,hãy kiểm tra hòm thư của bạn' });
            }
        }
        catch (error) {
            return res.status(500).send({ msg: error.message });
        }
    }
};
const loginUser = async (user, password, res) => {
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        let msgError = user.type === "register"
            ? "Sai mật khẩu,vui lòng nhập lại."
            : `Sai mật khẩu. Tài khoản này hiện đăng nhập vói Facebook`;
        return res.status(400).json({ msg: msgError });
    }
    const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
    const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: user._id }, res);
    await userModel_1.default.findOneAndUpdate({ _id: user._id }, {
        rf_token: refresh_token,
    });
    res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({
        msg: "Login Success!",
        access_token,
        user: Object.assign(Object.assign({}, user._doc), { password: "" }),
    });
};
const registerUser = async (user, res) => {
    const newUser = new userModel_1.default(user);
    const access_token = (0, generateToken_1.generateAccessToken)({ id: newUser._id });
    const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: newUser._id }, res);
    newUser.rf_token = refresh_token;
    await newUser.save();
    res.json({
        msg: "Login Success!",
        access_token,
        user: Object.assign(Object.assign({}, newUser._doc), { password: "" }),
    });
};
exports.default = authControl;
//# sourceMappingURL=authControl.js.map