const express = require("express");
const router = express.Router();
const authorization = require('../middleware/authMiddleware');
const { contactUs } = require("../controllers/contactController");


router.post("/", authorization,   contactUs);

module.exports = router;