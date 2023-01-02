"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validRegister = void 0;
const validRegister = async (req, res, next) => {
    const { name, account, password } = req.body;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;
    const errors = [];
    if (!name) {
        errors.push("Hãy nhập tên ");
    }
    else if (name.length > 20) {
        errors.push("Your name is up to 20 character long.");
    }
    if (!account) {
        errors.push("Please add your email ");
    }
    else if (!validateEmail(account)) {
        errors.push("Email  format is incorrect.");
    }
    if ((!password.match(regex))) {
        errors.push('password must have at least 6 character 1 letter ,1 number,1 uppercase and 1 special character');
    }
    if (errors.length > 0)
        return res.status(400).json({ msg: errors });
    next();
};
exports.validRegister = validRegister;
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
exports.validateEmail = validateEmail;
//# sourceMappingURL=valid.js.map