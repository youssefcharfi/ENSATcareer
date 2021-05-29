const express=require('express');
const router=express.Router();
const mongoose=require("mongoose");
const { login,register,forgotPassword,resetPassword } = require('../controllers/userController');

const User=mongoose.model("User")


//l'inscription 

  
router.post('/signin',register);
  //login
router.post('/login',login);
router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword/:resetToken',resetPassword);


module.exports=router