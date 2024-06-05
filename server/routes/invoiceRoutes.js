const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/getAllInvoices', invoiceController.getAllInvoices);
router.post('/getInvoiceData', invoiceController.getInvoiceData);
router.post('/deleteInvoice', invoiceController.deleteInvoice)
router.post('/updateInvoice', invoiceController.updateInvoice)

module.exports = router;