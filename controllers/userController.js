const User = require("../models/user")

exports.createUser = (req, res) => {

    const newUser = new User(req.body)

    newUser.save((error, Users) => {
        
        if(error){
            return res.status(400).json({
                error:error
            })
        }

        return res.json({
            'user':user
        })
    })
}