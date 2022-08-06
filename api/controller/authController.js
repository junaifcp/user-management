const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {createError}=require('../utils/error')
const User=require('../models/User')
exports.register=async(req,res,next)=>{
    try {
        console.log(req.body)
        const {password,email,fullname,dob,gender,designation,mobile}=req.body
        const isUser=await User.findOne({email})
        console.log(isUser)
        if(isUser) return next(createError(403,"User already registered with this email"))
        else{
            const salt=bcrypt.genSaltSync(10)
            const hash=bcrypt.hashSync(password,salt)
            const user=new User({
                fullname,
                dob,
                email,
                gender,
                designation,
                mobile,
                password:hash,
            })
            await user.save()
            res.status(201).json("You have successfully registered. Please login...")
        }
    } catch (error) {
        next(error)
    }
}
exports.login=async(req,res,next)=>{
    try {
        const{email,password}=req.body
        const user=await User.findOne({email})
        console.log(user)
        if(user?.disabled) return next(createError(400,"Your account has been desabled. Please contact support"))
        if(!user) return next(createError(400,"User not found"))
        const isPassCorrect=await bcrypt.compare(password,user.password)
        if(!isPassCorrect) return next(createError(400,"Wrong password"))
        else{
            const token=await jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET)
            const {password,...otherDetails}=user._doc
            res.cookie("accessToken",token,{maxAge:600000,httpOnly:true,secure:true}).status(200).json({...otherDetails})
        }
    } catch (error) {
        next(error)
    }
}