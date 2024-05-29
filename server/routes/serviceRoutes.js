const express = require('express');
const serviceController = require('../controllers/serviceController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/getAllServices', serviceController.getAllServices);
router.post('/getService', serviceController.getService);
router.post('/createService', serviceController.createService);
router.post('/deleteService', serviceController.deleteService);
router.post('/updateServiceOrder', serviceController.updateServiceOrder);

module.exports = router;