const express=require('express')
import authControl from '../controller/authControl'
import { validRegister } from '../middleware/valid'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/register', validRegister, authControl.dangky)
router.post('/active',authControl.activeAccount)
router.post('/login',authControl.dangnhap)
router.post('/facebook_login',authControl.facebookLogin)
router.get('/logout',auth,authControl.dangxuat)
router.get('/refresh_token',authControl.refreshToken)
router.post('/forgot_password',authControl.quenPass)

export default router;