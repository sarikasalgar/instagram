const mongoose= require('mongoose');
const User = mongoose.model('User')
const Post = mongoose.model('Post')

const express= require('express')
const router= express.Router()
const bycrypt= require('bcrypt')
const jwt = require('jsonwebtoken');
const {JWT_SECRET}= require('../secret')
const requireLogin = require('../middleware/requireLogin')

router.post('/signup',(req,res,next)=>{
    console.log(req.body)
    const {name,email,password} = req.body
    //check if all values are not empty
    if(!name || !email || !password){
        res.status(400).json({error: "please add all the field"})
    }

    //check if user already exists
    User.findOne({email:email})
        .then(
            (savedUser)=>{
                if(savedUser!= null){
                    return res.status(400).json({error:"User already exists with email"})                
                }

                //if user does not exists create new user
                bycrypt.hash(password,12)
                .then(
                    (hashedpassword)=>{
                        const user = new User({
                            name,
                            email,
                            password:hashedpassword
                        })
                        user.save()
                        .then(
                            user=>{
                                res.json({message: "Saved successfully"})
                            }
                        )
                        .catch(
                            err=>{
                                console.log(err)
                            }
                        )
                    }
                )
                
            }
        )
        .catch(
            err=>{
                console.log(err)
            }
        )
})

router.post('/login',(req,res,next)=>{
    //console.log(req.body)
    const{email,password}=req.body
    if(!email || !password){
        return res.status(400).json({error:"please add email and password"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(400).json({error:"invalid email or password"})
        } 
        
            const domatch= bycrypt.compare(password,savedUser.password)
            //.then(
                //(domatch)=>{
                    if (bycrypt.compare(password,savedUser.password)) {
                        const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                        res.status(400).json({ Message: "Successfull, Signed in",token});
                    }
                    else {
                        return res.status(400).json({ error: "Invalid email or password" });
                    }
                //}
            //)
        
        
    })
})

router.post('/topsecret',(req,res)=>{
    //console.log(req.headers)
    console.log(req.users)
    return res.status(400).json({message : "hii"})
})
module.exports=router