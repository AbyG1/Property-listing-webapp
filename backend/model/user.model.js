import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvUMjR6d8bnEeIC5ii83qzVVKu5NMQiJqeCQ&usqp=CAU"
    }
},{ timestamps: true })

const User = mongoose.model('User', userSchema)

export default User;