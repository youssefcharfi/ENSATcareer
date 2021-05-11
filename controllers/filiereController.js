const Filiere = require("../models/filiere")

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