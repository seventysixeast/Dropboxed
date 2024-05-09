const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/getAllInvoices', authenticateToken, invoiceController.getAllInvoices);
router.post('/deleteInvoice', authenticateToken, invoiceController.deleteInvoice)

module.exports = router;