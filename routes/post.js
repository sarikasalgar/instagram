const express= require('express')
const mongoose= require('mongoose')
const router= express.Router()
const requireLogin = require('../middleware/requireLogin')
const Post= mongoose.model("Post")

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find() 
    .populate("postedBy","name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/createpost",requireLogin,(req,res)=>{
    const {title,body}= req.body
    if(!title || !body){
        return res.status(400).json({error: "please add all the fields",post:savedPost})
    }
    const post= new Post({
        title,
        body,
        postedBy: req.user
    })
    post.save()
    .then((savedPost)=>{
        res.json({message:"Post created successfully"})
    })
    .catch(err=>{
        console.log(err)
    })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

})

router.get('/postbyme',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports= router