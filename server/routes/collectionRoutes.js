const express = require('express');
const collectionController = require('../controllers/collectionController');
const router = express.Router();

router.post('/addGallery', collectionController.addGallery);
router.post('/getAllCollections', collectionController.getAllCollections);
router.post('/getCollection', collectionController.getCollection);
router.post('/deleteCollection', collectionController.deleteCollection);

module.exports = router;