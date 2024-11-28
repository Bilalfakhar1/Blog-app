import express from 'express'
import {verifyToken} from '../utills/verifyUser.js'
import { create , getposts , deletepost, updatepost} from '../controller/post.controller.js'
const router = express.Router()
router.post('/create' , verifyToken , create)
router.get('/getposts', getposts)
router.delete('/deletepost/:userId/:postId', verifyToken, deletepost)

router.put('/updatepost/:postId/:userId', verifyToken, updatepost)


export default router