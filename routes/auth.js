const express=require('express');
const router=express.Router();
const mongoose=require("mongoose");
const { createUser } = require('../controllers/userController');
const User=mongoose.model("User")

router.post('/',(req,res)=>{
      var {name,email,password}=req.body
      console.log(req.body)
      if(!email || !password || !name)
      {
          return res.status(422).json({error:"Add all data"})
      }
    return res.status(200).json({message:"DONE  !"})
  })

module.exports=router