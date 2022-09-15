const express = require('express')
const app = express()
const port=4444
const mongoose=require('mongoose')
const {MONGOURL} =require('./secret.js')
require('./models/user')
require('./models/post')
//password: RxLav2hBbjI2Ol17
//username: insta_sarika



mongoose.connect(MONGOURL)

//for true case
mongoose.connection.on("connected",
    ()=>{console.log("connected to mongodb")}
)

//for false case
mongoose.connection.on("error",
    (err)=>{console.log("error connecting to mongodb",err)}
)


app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))



app.get('/',
(req,res)=>{res.send("Home page")}
)


app.listen(port,()=>{console.log('server is running at port ${port}')})