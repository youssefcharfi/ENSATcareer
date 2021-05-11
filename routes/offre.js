const express = require("express")

const router = express.Router()
const {offreMethod} = require("../controllers/offreController");

router.get('/', offreMethod)

module.exports = router;