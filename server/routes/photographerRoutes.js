const express = require('express');
const photographerController = require('../controllers/photographerController');
const router = express.Router();

router.post('/getAllPhotographers', photographerController.getAllPhotographers);
router.post('/createPhotographer', photographerController.createPhotographer);
router.post('/getPhotographer', photographerController.getPhotographer);
router.post('/deletePhotographer', photographerController.deletePhotographer);

module.exports = router;