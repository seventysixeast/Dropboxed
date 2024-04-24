const express = require('express');
const serviceController = require('../controllers/serviceController');
const router = express.Router();

router.post('/getAllServices', serviceController.getAllServices);
router.post('/getService', serviceController.getService);
router.post('/createService', serviceController.createService);

module.exports = router;