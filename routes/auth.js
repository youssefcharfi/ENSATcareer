const express=require('express');
const router=express.Router();
const mongoose=require("mongoose");
const { createUser } = require('../controllers/userController');

const User=mongoose.model("User")
const uservalidation=require("./validation");
 
const { registerValidation , loginValidation}= require('./validation');


//l'inscription 

  
router.post('/signup',(req,res)=>{
  var {name,email,password,filiere,niveau}=req.body
  // validate before submiting 
  const {error}=registerValidation(req.body);
  if(error) { return res.status(400).send(error.details[0].message);}
  // verify if the entered email already exists in our databases
  console.log(req.body);
  // create the user and save to the database 

  const user=new User(req.body);
  user.save((error,NewUser)=>{
    if(error){
     return  res.status(400).json({error:error});
    }
    return res.status(200).json({message:NewUser});
  });
     
  })
  //login
  router.post('/login',(req,res)=>{
     const {error}=loginValidation(req.body);
    if(error) { return res.status(400).send(error.details[0].message);}
    var {email,password}=req.body
    console.log(req.body)
   
    User.findOne({email,password}).populate("filiere").exec((error,user)=>{
      if(error || !user){
        return res.status(404).json({error:"User not found"});
      }
      return res.status(200).json(user);
    }) ;
    
  })


module.exports=router