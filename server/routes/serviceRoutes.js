const express = require('express');
const serviceController = require('../controllers/serviceController');
const router = express.Router();

router.post('/getAllServices', serviceController.getAllServices);

module.exports = router;