const express = require('express');
const collectionController = require('../controllers/collectionController');
const router = express.Router();

router.post('/addGallery', collectionController.addGallery);

module.exports = router;