"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const sendMail = async (to, url, txt) => {
    try {
        const tranport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: `${process.env.MAIL_USER}`,
                pass: `${process.env.MAIL_PASS}`,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: `${process.env.MAIL_USER}`,
            to: to,
            subject: "Chào mừng tới FoodBlog",
            html: ` 
           <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
           <h2 style="text-align: center; text-transform: uppercase;color: teal;">Chào mừng tới FoodBlog</h2>
           <p>Nhấn vào nút bên dưới để xác thực tài khoản của bạn</p>
           
           <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block; border-radius:3em">${txt}</a>
       
           <p>Nếu nút trên không hoạt động ,vui lòng nhấn vào link bên dưới &#9759;</p>
       
           <div>${url}</div>
           </div>`,
        };
        const result = await tranport.sendMail(mailOptions);
        return result;
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = sendMail;
//# sourceMappingURL=sendMail.js.map