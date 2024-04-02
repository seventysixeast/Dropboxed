const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();

router.post('/createClient', clientController.createClient);
router.post('/editClient', clientController.editClient);
router.post('/deleteClient', clientController.deleteClient);
router.get('/getAllClients', clientController.getAllClients);

module.exports = router;