import mongoose from 'mongoose'
import { IUser } from '../config/interface'
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Hãy nhập tên cho tài khoản"],
        trim: true,
        maxLength: [20, "Tên tài khoản giới hạn trong 20 ký tự"]
      },
      account: {
        type: String,
        required: [true, "Hãy nhập email của bạn"],
        trim: true,
        unique: true
      },
      password: {
        type: String,
        required: [true, "Hãy nhập mật khẩu"],
        MaxLength:[20,'Pass length require 6 to 20 char']
      },
      avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
      },
      role: {
        type: String,
        default: 'user' 
      },
      type: {
        type: String,
        default: 'register'
      },
      rf_token:{type:String,select:false}
    }, 
    {timestamps: true}
    )
    
    export default mongoose.model<IUser>('User', userSchema)