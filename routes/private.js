const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/private");
const { protect } = require("../middleware/author");

router.route("/").get(protect, getPrivateRoute);

module.exports = router;