const express = require("express")
const router = express.Router()
const {createFiliere} = require("../controllers/filiereController")

router.post('/', createFiliere)






module.exports = router;