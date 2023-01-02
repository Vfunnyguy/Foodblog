const express=require('express')
import userControl from '../controller/userControl'
import auth from '../middleware/auth'
const router=express.Router()

router.patch('/user',auth,userControl.updateUser)
router.patch('/reset_password', auth, userControl.resetPass)
router.get('/user/:id',  userControl.getUser)

export default router