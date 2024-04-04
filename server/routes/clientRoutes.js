const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();

console.log("11111111");

router.get('/getAllClients', clientController.getAllClients);
router.post('/createClient', clientController.createClient);
router.post('/getClient', clientController.getClient);
router.post('/deleteClient', clientController.deleteClient);

module.exports = router;