const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/getAllInvoices', invoiceController.getAllInvoices);
router.post('/deleteInvoice', invoiceController.deleteInvoice)

module.exports = router;