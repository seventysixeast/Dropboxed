const express = require('express');
const ordersController = require('../controllers/ordersController');
const router = express.Router();

router.post('/getAllOrders', ordersController.getAllOrders);

module.exports = router;