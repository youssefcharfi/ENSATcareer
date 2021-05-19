const express = require("express");

const router = express.Router()
const {createOffre, getAllOffres, getOffreById, offreById, deleteOffre, updateOffre, getOffresByFiliere, offresByFiliere} = require("../controllers/offreController");

router.post('/create', createOffre)
router.get('/all', getAllOffres)
router.get('/:id', getOffreById)
router.delete('/:id', deleteOffre)
router.put('/:id', updateOffre)
router.get('/byfiliere/:filiereId', getOffresByFiliere)

router.param('id', offreById)
router.param('filiereId', offresByFiliere)

module.exports = router;