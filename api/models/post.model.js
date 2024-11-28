import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    userID:{
        type: String,
        require:  true
    },
    content:{
        type: String,
        require: true
    },
    title:{
        type: String,
        require: true,
        unique: true
    },
    image:{
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ0JsvMgqFaoc2sETK_NJl89I58BkPgYLVLg&s'
    },
    category:{
        type: String,
        default: 'uncategorized'
    },
    slug:{
        type: String,
        require: true,
        unique: true
    }
},{timestamps: true} )

const Post = mongoose.model('Post' , postSchema)
export default Post