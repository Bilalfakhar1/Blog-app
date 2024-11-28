import 'dotenv/config';
import express, { json } from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

const __dirname = path.resolve()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.listen(3000,()=>{
    console.log('server is running ')
})

app.use('/api/user' , userRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

app.use(express.static(path.join(__dirname ,'/client/dist')))

app.get('*' ,(req, res)=>{
 res.sendFile(path.join(__dirname , 'client' , 'dist' , 'index.html'))
})

app.use((err , req , res ,next) =>{
const statusCode = err.statusCode || 500
const message = err.message ||' Internal server error'
res.status(statusCode).json({
    success : false,
    statusCode,
    message
})
})