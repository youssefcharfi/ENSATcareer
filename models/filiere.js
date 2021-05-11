const mongoose = require('mongoose')

const filiereSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type: String,
        required:true
    },
    link:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model('Filiere',filiereSchema)