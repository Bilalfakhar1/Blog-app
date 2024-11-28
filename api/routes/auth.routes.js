import express from 'express'
import { signup , SignIn , google} from '../controller/auth.controller.js'

const router = express.Router()
router.post('/signup', signup)
router.post('/SignIn', SignIn)
router.post('/google', google)



export default router