const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const offreSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
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
    filiere:{
        type: ObjectId,
        ref: 'Filiere',
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('Offre',offreSchema)