import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";
import { IDecodedToken, IReqAuth, IUser, IUserParams } from "../config/interface";
import sendMail from "../config/sendMail";
import { validateEmail } from "../middleware/valid";
import fetch from "node-fetch";
const authControl = {
  dangky: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;
      const user = await Users.findOne({ account });
      if (user) return res.status(400).send({ msg: "Email đã đươc sử dụng" });
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = { name, account, password: passwordHash };
      const active_token = generateActiveToken({ newUser });
      const url = `${process.env.SERVER_URL}/active/${active_token}`;
      if (validateEmail(account)) {
        sendMail(account, url, "Xác thực tài khoản ");
        return res.send({ msg: "Thành công!Hãy kiểm tra hòm thư của bạn" });
      }

      res.send({
        status: "OK",
        msg: "Register successfully",
        data: newUser,
        active_token,
      });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;
      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );
      const { newUser } = decoded;
      if (!newUser) return res.status(400).send({ msg: "Lỗi xác thực" });

      const user = await Users.findOne({ account: newUser.account });
      if (user) return res.status(400).send({ msg: "Tài khoản đã tồn tại" });
      const new_user = new Users(newUser);

      await new_user.save();

      res.send({ msg: "Kích hoạt tài khoản thành công" });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  dangnhap: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;
      const user = await Users.findOne({ account });
      if (!user)
        return res.status(400).send({ msg: "Tài khoản không tồn tại" });

      loginUser(user, password, res);
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  dangxuat: async (req: IReqAuth, res: Response) => {
    if(!req.user)return res.status(400).send({msg:'Invalid'})
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      await Users.findOneAndUpdate({_id: req.user._id}, {
        rf_token: ''
      })
      return res.send("Đăng Xuất!");
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).send({ msg: "Hãy đăng nhập ngay!" });

      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );
      if (!decoded.id)
        return res.status(400).send({ msg: "Hãy đăng nhập ngay!" });

      const user = await Users.findById(decoded.id).select("-password +rf_token");
      if (!user)
        return res.status(400).send({ msg: "Tài khoản này không tồn tại" });
      if(rf_token !== user.rf_token) 
        return res.status(400).send({ msg: "Hãy đăng nhập ngay!" });
       
      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({id: user._id}, res)

      await Users.findOneAndUpdate({_id: user._id}, {
        rf_token: refresh_token
      })

      res.json({ access_token, user });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  facebookLogin: async (req: Request, res: Response) => {
    try {
      const { accessToken, userID } = req.body;
      const URL = `
        https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}
      `;
      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });
      const { email, name, picture } = data;
      const password = email + "your facebook secrect password";
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await Users.findOne({ account: email });

      if (user) {
        loginUser(user, password, res);
      } else {
        const user = {
          name,
          account: email,
          password: passwordHash,
          avatar: picture.data.url,
          type: "login",
        };
        registerUser(user, res);
      }
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  quenPass:async (req:Request,res:Response) => {
    try {
      const {account}=req.body
      const user=await Users.findOne({account})
      if(!user) return res.status(400).send({ msg:"Tài khoản không tồn tại" });
      if(user.type !== 'register') return res.status(400).send({ msg: "tài khoản đăng nhập bằng facebook không thể thưc hiện chức năng này "});
      const access_token=generateAccessToken({id:user._id})
      const url=`${process.env.SERVER_URL}/reset_password/${access_token}`
      if(validateEmail(account)){
        sendMail(account,url,'Quên mật khẩu?')
        return res.send({msg:'Thành công!,hãy kiểm tra hòm thư của bạn'})
      }
    } catch (error:any) {
      return res.status(500).send({ msg: error.message });
    }
    
  }
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    let msgError =
      user.type === "register"
        ? "Sai mật khẩu,vui lòng nhập lại."
        : `Sai mật khẩu. Tài khoản này hiện đăng nhập vói Facebook`;

    return res.status(400).json({ msg: msgError });
  }

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id },res);
  await Users.findOneAndUpdate(
    { _id: user._id },
    {
      rf_token: refresh_token,
    }
  );

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });

  res.json({
    msg: "Login Success!",
    access_token,
    user: { ...user._doc, password: "" },
  });
};
const registerUser = async (user: IUserParams, res: Response) => {
  const newUser = new Users(user);

  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id },res);

  newUser.rf_token = refresh_token;
  await newUser.save();

  res.json({
    msg: "Login Success!",
    access_token,
    user: { ...newUser._doc, password: "" },
  });
};

export default authControl;
