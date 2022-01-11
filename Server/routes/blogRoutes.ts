import express  from "express";
import blogControl from "../controller/blogControl";
import auth from '../middleware/auth'
const router =express.Router()
router.post('/blog',auth,blogControl.createBlog)
router.get('/home/getBlog',blogControl.getHomeBlog)
router.get('/getBlog/category/:id',blogControl.getBlogByCategory)
router.get('/getBlog/user/:id',blogControl.getBlogByUser)
router.route('/getBlog/:id')
    .get(blogControl.getBlog)
    .put(auth,blogControl.updateBlog)
    .delete(auth,blogControl.deleteBlog)

router.get('/search/blog',blogControl.searchBlog)

export default router