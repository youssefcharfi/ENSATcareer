const { string, boolean } = require('@hapi/joi')
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const jwt=require('jsonwebtoken')
const crypto=require('crypto')

const userSchema= new mongoose.Schema({
    name :{
      type:String,
      required:[true,"Please enter your Name !"],
      trim:true
    },
    email:{
        type:String,
        required:[true,"Please enter your email !"],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please enter your password !"],
        trim:true
    },
    filiere:{
     type:ObjectId,
     ref:'Filiere',
     required:false
    },
    niveau:{
     type:Number,
     required:false,

    },
    description:{
     type:String,
     required:false
    },
    link:{
      type:String,
      required:false
    },
    isEntreprise:{
      type:Boolean,
      required:true 
     },
     resetPasswordToken: String,
     resetPasswordExpire: Date,
    
    
});
userSchema.methods.getsignedToken=function() {
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
};
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};
module.exports = mongoose.model('User',userSchema)