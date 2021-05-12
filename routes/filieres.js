const express = require("express")
const router = express.Router()
const {createFiliere, getAllFileres, filiereById, getFiliereById, deleteFiliere, updateFiliere} = require("../controllers/filiereController")

router.post('/create', createFiliere)
router.get('/all', getAllFileres)
router.get('/:id', getFiliereById)
router.delete('/:id', deleteFiliere)
router.put('/:id', updateFiliere)

// s'il y'a un param /:id, la methode(middleware) filiereById va s'excecuter premierement
router.param('id', filiereById)





module.exports = router;