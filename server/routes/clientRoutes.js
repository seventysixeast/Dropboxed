const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();

router.post('/getAllClients', clientController.getAllClients);
router.post('/createClient', clientController.createClient);
router.post('/getClient', clientController.getClient);
router.post('/deleteClient', clientController.deleteClient);
router.post('/activeInactiveClient', clientController.activeInactiveClient);
router.post('/getAllPhotographers', clientController.getAllPhotographers);

module.exports = router;