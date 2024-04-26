const express = require('express');
const serviceController = require('../controllers/serviceController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/getAllServices', authenticateToken, serviceController.getAllServices);
router.post('/getService', authenticateToken, serviceController.getService);
router.post('/createService', authenticateToken, serviceController.createService);
router.post('/deleteService', authenticateToken, serviceController.deleteService);

module.exports = router;