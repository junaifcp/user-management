const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    fullname:{type:String},
    email:{type:String},
    dob:{type:Date},
    gender:{type:String},
    designation:{type:String},
    mobile:{type:String},
    password:{type:String},
    termsAndConditions:{type:Boolean},
    desabled:{type:Boolean,default:false}
},{timestamps:true})
module.exports=mongoose.model("User",UserSchema);
