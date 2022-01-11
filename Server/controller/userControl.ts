import{Request,Response} from 'express'
import { IReqAuth } from 'config/interface'
import Users from'../models/userModel'
import bcrypt from 'bcrypt'
const userControl={
 updateUser:async(req:IReqAuth,res:Response)=>{
   if(!req.user)return res.status(400).send({msg:"Invalid"})



     try {
         const{avatar,name}=req.body
         await Users.findOneAndUpdate({_id: req.user._id}, {
            avatar, name
          })




         res.send({msg:'Update Success'})
     } catch (err:any) {
         return res.status(500).send({msg:err.message})
         
     }
 },
 resetPass:async(req:IReqAuth,res:Response)=>{
   if(!req.user)return res.status(400).send({msg:'Invalid'})
   if(req.user.type!=='register')return res.status(400).send({msg:`Tài khoản đăng nhập bằng Facebook không thể thay đối thông tin`})
   try {
     const {password}=req.body
     const passwordHash=await bcrypt.hash(password,12)
     await Users.findOneAndUpdate({_id:req.user._id},{
       password:passwordHash
     })
     res.send({msg:'Success reset password'})
   } catch (error:any) {
     return res.status(500).send({msg:error.message})
     
   }
 },
 getUser:async(req:Request,res:Response)=>{
  try {
    const user = await Users.findById(req.params.id).select('-password')
    res.send(user)
  } catch (error:any) {
    res.status(500).send({msg:error.message})
  }
 }




}
export default userControl