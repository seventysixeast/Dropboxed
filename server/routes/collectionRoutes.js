const express = require('express');
const collectionController = require('../controllers/collectionController');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/addGallery', collectionController.addGallery);
router.post('/getAllCollections', collectionController.getAllCollections);
router.post('/getCollection', collectionController.getCollection);
router.post('/getDropboxRefresh', collectionController.getDropboxRefresh)
router.post('/deleteCollection', collectionController.deleteCollection);
router.post('/updateGalleryLock', collectionController.updateGalleryLock);
router.post('/updateCollection', collectionController.updateCollection);
router.post('/updateGalleryNotify', collectionController.updateGalleryNotify);
router.post('/getOrderDataForInvoice', collectionController.getOrderDataForInvoice);
router.post('/save-invoice', authenticateToken, collectionController.saveInvoiceToDatabase);

module.exports = router;