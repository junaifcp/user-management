require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')


const app=express()
app.use(cors())
const PORT=process.env.PORT||5001
//DATABASE CONNECTION
require('./connection/db')();
mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected");
})

//MIDDLEWARES
app.use(cookieParser())
app.use(bodyParser.json({extended:true,limit:"10mb"}))
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)





//ERROR HANDLING
app.use((err,req,res,next)=>{
    const errorStatus=err.status||500
    const errorMessage=err.message||"Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

//LISTEN TO PORT
app.listen(5001,()=>{
    console.log(`Api connected on port ${PORT}`);
})
