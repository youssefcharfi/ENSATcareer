const Offre = require("../models/offre")

exports.createOffre = (req, res) => {
    const newOffre = new Offre(req.body)
    newOffre.save((error, offre) => {
        if(error) return res.json({
            error: "offre n'est pas crée !!"
        })
        return res.json({
            offre,
        })
    })

}


// get All offres from mongoDB

exports.getAllOffres = (req, res) => {

    Offre.find()
         .sort({createdAt:-1})
         .populate('filiere')
         .exec((error, offres) => {
            if(error) return res.json({
             error
             })

            return res.json({
                offres
            })
    })
}

// get one offre filtered by id

exports.offreById  = (req, res, next, id) => {
    Offre.findById(id).populate('filiere').exec((err, offre) => {
        if(err || !offre){
            return res.status(404).json({
                error:"offre n'est pas trouvée"
            })
        }
        req.offre = offre
        next()
    })
}

exports.getOffreById = (req, res) => {
    return res.json({
        offre: req.offre
    })
}

// delete offre by Id

exports.deleteOffre = (req, res) => {
    Offre.deleteOne({_id:req.offre._id}, (error) => {
        if(error) return res.json({
            error:"problème de suppression d'offre"
        })

        return res.status(204).json({})
    })
}

// update offre

exports.updateOffre = (req, res) => {
    Offre.findOneAndUpdate({_id: req.offre._id}, {$set : req.body} ,{new:true, useFindAndModify:false}, (error, offreUpdated) => {
        if(error) return res.json({
            error:"problème de modification !!"
        })
        return res.json({offre:offreUpdated})
    })
}

// get offres by filieres 

exports.offresByFiliere = (req, res, next, filiereId) => {
    
    Offre.find({filiere: filiereId}).populate('filiere')
         .sort({createdAt:-1})
         .exec((error, offres) => {

            if(error || !offres) return res.status(404).json({
                error:"pas d'offres !!"
            })

            req.offres = offres
            next()
         })
}

exports.getOffresByFiliere = (req, res) => {
    return res.json({
        offres: req.offres
    })
}

