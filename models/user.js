const { string, boolean } = require('@hapi/joi')
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const userSchema= new mongoose.Schema({
    name :{
      type:String,
      required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
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
     }
    
    
})
module.exports = mongoose.model('User',userSchema)