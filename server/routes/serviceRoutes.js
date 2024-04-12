const express = require('express');
const serviceController = require('../controllers/serviceController');
const router = express.Router();

router.get('/getAllServices', serviceController.getAllServices);

module.exports = router;