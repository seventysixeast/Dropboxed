const express = require('express');
const imageTypeController = require('../controllers/imageTypeController');
const router = express.Router();

router.post('/getImageTypes', imageTypeController.getImageTypes);
router.post('/createImageType', imageTypeController.createImageType);
router.post('/getImageType', imageTypeController.getImageType);
router.post('/deleteImageType', imageTypeController.deleteImageType);

module.exports = router;