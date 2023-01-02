import express from 'express'
import binhluanControl from '../controller/binhluanControl'
import auth from '../middleware/auth'
const dinhtuyen=express.Router()
dinhtuyen.post('/comment',auth,binhluanControl.createComment)
dinhtuyen.get('/comment/blogs/:id',binhluanControl.getComment)
dinhtuyen.post('/reply_comment',auth,binhluanControl.replyComment)
dinhtuyen.patch('/comment/:id',auth,binhluanControl.updateComment)
dinhtuyen.delete('/comment/:id',auth,binhluanControl.deleteComment)
export default dinhtuyen