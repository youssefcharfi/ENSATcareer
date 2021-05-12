const { response } = require("express")
const Filiere = require("../models/filiere")

//Create new filiere

exports.createFiliere = (req, res) => {
    const newFiliere = new Filiere(req.body)

    newFiliere.save((error, filiere) => {
        if(error){
            return res.status(400).json({
                error:error
            })
        }

        return res.json({
            'filiere':filiere
        })
    })
}

// get All filieres from mongoDB

exports.getAllFileres = (req, res) => {

    Filiere.find().sort({name:1}).exec((error, filieres) => {

        if(error) return res.json({
            error
        })

        return res.json({
            filieres
        })
         
    })
}

// get one Filiere filtered by id

exports.filiereById  = (req, res, next, id) => {
    Filiere.findById(id).exec((err, filiere) => {
        if(err || !filiere){
            return res.status(404).json({
                error:"filiere n'est pas trouvée"
            })
        }
        req.filiere = filiere
        next()
    })
}

exports.getFiliereById = (req, res) => {
    return res.json({
        filiere: req.filiere
    })
}

// delete filiere by Id

exports.deleteFiliere = (req, res) => {
    Filiere.deleteOne({_id:req.filiere._id}, (error) => {
        if(error) return res.json({
            error:"problème de suppression du filiere"
        })

        return res.status(204).json({})
    })
}

// update filiere

exports.updateFiliere = (req, res) => {
    Filiere.findOneAndUpdate({_id: req.filiere._id}, {$set : req.body} ,{new:true, useFindAndModify:false}, (error, filiereUpdated) => {
        if(error) return res.json({
            error:"problème de modification !!"
        })
        return res.json({filiere:filiereUpdated})
    })
}
