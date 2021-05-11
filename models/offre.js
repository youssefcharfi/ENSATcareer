const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const offreSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:Text,
        required:true
    },
    entreprise:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:false
    },
    filieres:{
        type: ObjectId,
        ref: 'Filiere',
        required:true
    }
})

module.exports = mongoose.model('Ofrre',offreSchema)