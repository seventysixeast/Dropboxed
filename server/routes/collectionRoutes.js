const express = require('express');
const collectionController = require('../controllers/collectionController');
const router = express.Router();

router.post('/addGallery', collectionController.addGallery);
router.post('/getAllCollections', collectionController.getAllCollections);
router.post('/getCollection', collectionController.getCollection);
router.post('/getDropboxRefresh', collectionController.getDropboxRefresh)
router.post('/deleteCollection', collectionController.deleteCollection);
router.post('/updateGalleryLock', collectionController.updateGalleryLock);
router.post('/updateCollection', collectionController.updateCollection);

module.exports = router;