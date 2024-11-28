import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from "../utills/error.js";
export const signup = async (req, res , next) => {
    const {username , email , password} = req.body;


if(!username || !email || !password || username === '' || email === '' || password === ''){
    // return  res.status(400).json({message: "all Fields are required"});
    next(errorHandler(400, 'All fields are required'))
}

const hasshedPassword = bcryptjs.hashSync(password ,10)
 const newUser = User({
    username,
    email,
    password: hasshedPassword
 })

try {
    await newUser.save()
 res.json("signup successful")
} catch (error) {
    next(error)
}

}

export const SignIn = async (req, res , next) =>{
 

    const { email, password } = req.body;
    if(!email ||  !password || email === "" || password === ""){
       return next(errorHandler('All fields are reuired'))
    }
    try {
        const validuser = await User.findOne({email})
        if(!validuser){
           return  next(errorHandler(400, 'User not found'))
        }
        const validpassword = bcryptjs.compareSync(password ,validuser.password)
        if(!validpassword){
           return next(errorHandler(400, 'Incorrect password'))
        }
        const token = jwt.sign(
            {id: validuser._id , isAdmin: validuser.isAdmin}, process.env.JWT_SECRET
        )

        const {password:pass , ...rest} = validuser._doc
        res.status(200).cookie('access_token', token,{
                httpOnly: true
        }).json(rest)
    } catch (error) {
        next(error)
    }
}

export const google = async(req,res,next)=>{
    const{name, email , googlePhotoUrl} = req.body
    try {
        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign(
                {id: user._id , isAdmin:user.isAdmin}, process.env.JWT_SECRET
            )
    
            const {password:pass , ...rest} = user._doc
            res.status(200).cookie('access_token', token,{
                    httpOnly: true
            }).json(rest)
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hasshedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = new User({
                username: name.toLowerCase().split('').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hasshedPassword,
                profilePicture:googlePhotoUrl

            })
            await newUser.save()
            const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET)
            const {password:pass , ...rest} = newUser._doc
            res.status(200).cookie('access_token', token,{
                    httpOnly: true
            }).json(rest)
        
        }
    } catch (error) {
        next(error)
    }
}