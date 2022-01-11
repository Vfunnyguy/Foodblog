import {  Response } from "express";
import categoryModel from "../models/categoryModel";
import blogModel from "../models/blogModel";
import { IReqAuth } from "../config/interface";
const categoryControl = {
  createCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).send({ msg: "Invalid" });
    if (req.user.role !== "admin")
      return res.status(400).send({ msg: "deo phai bo doi" });
    try {
      const name = req.body.name.toLowerCase();
      const newCategory = new categoryModel({ name });
      await newCategory.save();
      res.json({ newCategory });
    } catch (error: any) {
      let tinLoi;
      if (error.code === 11000) {
        tinLoi = Object.values(error.keyValue)[0] +   "đã tồn  tại";
      } else {
        let name = Object.keys(error.error)[0];
        tinLoi = error.error[`${name}`].message;
      }
      return res.status(500).send({ msg: tinLoi });
    }
  },
  getCategory: async (_req: IReqAuth, res: Response) => {
    try {
      const categories = await categoryModel.find().sort("-createdAt");
      res.json({ categories });
    } catch (error: any) {
      return res.status(500).send({ msg: error.message });
    }
  },
  updateCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "deo phai bo doi." });

    try {
      const category = await categoryModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { name:( req.body.name).toLowerCase() }
      );

      res.send({ msg: "Cập nhập thành công!",category });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const blog=await blogModel.findOne({category:req.params.id})
      if(blog) return res.status(400).send({msg:'Không thể xóa vì đã có bài viết tồn tại '})
      const category = await categoryModel.findByIdAndDelete(req.params.id);
      if(!category)return res.status(400).send({msg:'Thể loại không tồn tại '})
      res.json({ msg: "Xóa thành công!",category });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
export default categoryControl;
