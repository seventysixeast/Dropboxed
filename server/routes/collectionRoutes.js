const express = require('express');
const collectionController = require('../controllers/collectionController');
const router = express.Router();

router.post('/addGallery', collectionController.addGallery);
router.post('/getAllCollections', collectionController.getAllCollections);

module.exports = router;