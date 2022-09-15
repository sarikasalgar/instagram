const mongoose= require('mongoose');
const {ObjectId}= mongoose.Schema.Types
const User= mongoose.model("User")


const postSchma = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    photo:{
        type: String,
        dafault: "no photo"
    },
    postedBy:{
        type: ObjectId,
        ref:"User"
    }
})
module.exports= mongoose.model("Post",postSchma)