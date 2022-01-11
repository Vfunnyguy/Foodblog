import { Request,Response} from 'express'
import blogModel from '../models/blogModel'
import commentModel from '../models/commentModel'
import {IReqAuth}from '../config/interface'
import  mongoose from 'mongoose'
const Pagination=(req:IReqAuth)=>{
  let page=Number(req.query.page)*1||1
  let limit=Number(req.query.limit)*1||4
  let skip=(page-1)*limit
  return{page ,limit,skip}
}
const blogControl={
  createBlog:async (req:IReqAuth,res:Response) => {
    if(!req.user)return res.status(400).send({msg:'Invalid'})
    try {
      const {title,content,description,thumbnail,category}=req.body
      const newBlog = new blogModel({
        user: req.user._id,
        title:title.toLowerCase(), 
        content,
        description, 
        thumbnail, 
        category
      })

      await newBlog.save()
      res.json({...newBlog._doc,
        user:req.user
      })

    } catch (error:any) {
      return res.status(500).send({msg:error.message})
    }
  },
  getHomeBlog:async (_req:Request,res:Response ) => {
    try {
      const getBlog=await blogModel.aggregate([
        //user
        {
          $lookup:{
            from: "users",
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              { $project: { password: 0 }}
            ],
            as: "user"
          }
        },
        {$unwind:'$user'},
        //category
        {
          $lookup:{
            'from':'categories',
            'localField':'category',
            'foreignField':"_id",
            'as':"category"
          }
        },
        {$unwind:'$category'},
        //sort
        {$sort:{'createdAt':-1}},
        //group by category
        {
          $group:{
            _id:'$category._id',
            name:{$first:"$category.name"},
            getBlog:{$push:"$$ROOT"},
            count:{$sum:1}
          }
        },
        //phan trang
        {
          $project:{
            blogs:{
              $slice:['$getBlog',0,4]
            },
            count:1,
            name:1
          }
        }
      ])
     res.send(getBlog)
    } catch (error:any) {
      
    }
  },
  getBlogByCategory:async(req:Request,res:Response)=>{
    const { limit, skip } = Pagination(req)
    try {
      const data=await blogModel.aggregate([
       {
         $facet:{
           totalData:[
             {
               $match:{
                category:new mongoose.Types.ObjectId(req.params.id)
               }
             },
             {
               $lookup:{
                 from:'users',
                 let:{user_id:'$user'},
                 pipeline:[
                   {$match:{$expr:{$eq:['$_id','$$user_id']}}},
                   {$project:{password:0}}
                 ],
                 as:'user'

               }
               
             },
             {$unwind:"$user"},
             {$sort:{createdAt:-1}},
             {$skip:skip},
             {$limit:limit}
           ],
           totalCount:[
             {
               $match:{
                 category:new mongoose.Types.ObjectId(req.params.id)
               }
             },
             {$count:'count'}
           ]
         }
       },
       {
        $project: {
          count: { $arrayElemAt: ["$totalCount.count", 0] },
          totalData: 1
        }
       }
      ])
      const blogs=data[0].totalData
      const dem=data[0].count
      let total=0;
      if(dem%limit===0){
        total=dem/limit
      }else{
        total=Math.floor(dem/limit)+1
      }
      res.send({blogs,total})
    } catch (error:any) {
      return res.status(500).json({msg:error.message})
    }
  },
  getBlogByUser:async(req:Request,res:Response)=>{
    const { limit, skip } = Pagination(req)
    try {
      const data=await blogModel.aggregate([
       {
         $facet:{
           totalData:[
             {
               $match:{
                user:new mongoose.Types.ObjectId(req.params.id)
               }
             },
             {
               $lookup:{
                 from:'users',
                 let:{user_id:'$user'},
                 pipeline:[
                   {$match:{$expr:{$eq:['$_id','$$user_id']}}},
                   {$project:{password:0}}
                 ],
                 as:'user'

               }
               
             },
             {$unwind:"$user"},
             {$sort:{createdAt:-1}},
             {$skip:skip},
             {$limit:limit}
           ],
           totalCount:[
             {
               $match:{
                 user:new mongoose.Types.ObjectId(req.params.id)
               }
             },
             {$count:'count'}
           ]
         }
       },
       {
        $project: {
          count: { $arrayElemAt: ["$totalCount.count", 0] },
          totalData: 1
        }
       }
      ])
      const blogs=data[0].totalData
      const dem=data[0].count
      let total=0;
      if(dem%limit===0){
        total=dem/limit
      }else{
        total=Math.floor(dem/limit)+1
      }
      res.send({blogs,total})
    } catch (error:any) {
      return res.status(500).json({msg:error.message})
    }
  },
  getBlog:async (req:Request,res:Response) => {
    try {
      const blog=await blogModel.findOne({_id:req.params.id}).populate('user','-passworsd')
      if(!blog)return res.status(400).send({msg:'Bài viết không tồn tại'})
      return res.send(blog)
    } catch (error:any) {
      return res.status(500).json({msg:error.message})
    }
    
  },
  updateBlog:async (req:IReqAuth,res:Response) => {
    if(!req.user)return res.status(400).send({msg:'Invalid'})
    try {
      const blog= await blogModel.findOneAndUpdate({
        _id: req.params.id, user: req.user.id
      },req.body)
      if(!blog)return res.status(400).send({msg:'Invalid'})
      res.send({msg:"Update Success",blog})    
    } catch (error:any) {
      return res.status(500).send({msg:error.message})
    }
  },
  deleteBlog:async (req:IReqAuth,res:Response) => {
    if(!req.user)return res.status(400).send({msg:'Invalid'})
    try {
      //xoa blog
      const blog=await blogModel.findByIdAndDelete(req.params.id,req.user._id)
      if(!blog)return res.status(400).send({msg:'Invalid'})
      //xoa comment
      await commentModel.deleteMany({blog_id:blog._id})
      return res.send({msg:'Xóa thành công!'})
    } catch (error:any) {
      return res.status(500).send({msg:error.message})
    }
  },
  searchBlog:async (req:Request,res:Response) => {
    try {
      const blog=await blogModel.aggregate([
        {
          $search:{
            index:'searchTitle',
            autocomplete:{
              "query":`${req.query.title}`,
              "path":"title"
            }
          }
        },
        {$sort:{createdAt:-1}},
        {$limit:5},
        {
          $project:{
            title:1,
            description:1,
            thumbnail:1,
            createdAt:1
          }
        }
      ])
      if(!blog.length) return res.status(400).send({msg:'Not found'})
      res.send(blog)
    } catch (error:any) {
      return res.status(500).send({msg:error.message})
    }
    
  }

}
export default blogControl                             