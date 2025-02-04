import User from "../models/user.model.js"
import { errorHandler } from "../utills/error.js"
import bcryptjs from 'bcryptjs'

export const test = (req, res)=>{
    res.json( "appi testing!!!")
}

export const updateUser = async(req, res, next)=>{
if(req.user.id !== req.params.userId){
return next(errorHandler(403, 'You are not allowed to do update this user'))
}
if(req.body.password){
    if(req.body.password.length < 6){
        return next(errorHandler(400 , 'Password must be al least 6 character'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password , 10)
}
if(req.body.username){
    if(req.body.username.length < 7 || req.body.username.length > 20){
        return next(errorHandler(400, 'Username must be between 7 to 20 character '))
    }
    if(!req.body.username || req.body.username.trim() === '') {
        return next(errorHandler(400 , 'User name cannot contain empty space'))
    }
    if(req.body.username !== req.body.username.toLowerCase()){
        return next(errorHandler(400 , 'Username must be lowercase'))
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return next(errorHandler(400 , 'Username can only contain numbers and letters'))
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password

            }
        },{new:true})
        const{password , ...rest} = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        
    }
}
}
export const deleteUser = async(req, res, next ) => {
if(!req.user.isAdmin && req.user.id !== req.params.userId){
return next(errorHandler("You are not allowed to delete this acount"))
}
try {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json('User has been Deleted')
} catch (error) {
    next(error)
}
}
export const signout  =  (req, res, next) =>{
try {
    res.clearCookie('access_token').status(200).json('user has been signed out')
} catch (error) {
    next(error)
}
}

export const getUsers = async (req, res , next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to see users'))
    }
   
    try {
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 9
        const sortDirection = req.query.sort === 'asc'? 1: -1

        const users = await User.find().sort({createdAt: sortDirection}).skip(startIndex).limit(limit)

        const usersWithoutPassword = users.map((user)=>{
            const{password , ...rest} = user._doc
            return rest
        })
        const totalUser = await User.countDocuments()
        const now = new Date()
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() -1, now.getDate())
        const lastMonthUsers = await User.countDocuments({
            createdAt:{$gte: oneMonthAgo}
        })
        res.status(200).json({
            users: usersWithoutPassword,
            totalUser, 
            lastMonthUsers
        })
    } catch (error) {
        next(error)
    }
}


