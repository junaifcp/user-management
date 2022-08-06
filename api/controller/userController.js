const bcrypt=require('bcryptjs')
const { response } = require('express')
const User=require('../models/User')

//UPDATE A USER
exports.updateUser=async(req,res,next)=>{
    try {
        console.log(req.body)
        console.log("first")
        if(req.body.password){
            try {
                const salt=await bcrypt.genSalt(10)
               req.body.password=await bcrypt.hash(req.body.password,salt)
            } catch (error) {
                next(error)
            }
        }
        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
}
//GET ALL USERS
exports.getAllUsers=async(req,res,next)=>{
    try {
        const users=await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}
//GET SINGLE USERS
exports.getSingleUser=async(req,res,next)=>{
    try {
        console.log("first")
        const user=await User.findOne({email:req.params.id})
        console.log(user)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
//DELETE USER
exports.deleteUser=async(req,res,next)=>{
    try {
        await User.findOneAndDelete({email:req.params.id})
        res.status(200).json("Account has been deleted")
    } catch (error) {
        next(error)
    }
}
//DISABLED OR ENABLED
exports.disabled=async(req,res,next)=>{
    try {
      const user= await User.findOne({email:req.params.id})
      if(user.desabled) {
        await User.findByIdAndUpdate(user._id.toString(),{
            $set:{
                desabled:false
            }
        })
        res.status(200).json("User has been unblocked successfully")
    }else{
        await User.findByIdAndUpdate(user._id.toString(),{
            $set:{
                desabled:true
            }
        })
        res.status(200).json("User has been blocked")
    }
    } catch (error) {
        next(error)
    }
}