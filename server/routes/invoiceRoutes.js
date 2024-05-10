const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/getAllInvoices', authenticateToken, invoiceController.getAllInvoices);

module.exports = router;