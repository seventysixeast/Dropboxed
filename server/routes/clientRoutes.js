const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();

router.get('/getAllClients', clientController.getAllClients);
router.post('/createClient', clientController.createClient);
router.post('/getClient', clientController.getClient);
router.post('/deleteClient', clientController.deleteClient);
router.post('/activeInactiveClient', clientController.activeInactiveClient);

module.exports = router;