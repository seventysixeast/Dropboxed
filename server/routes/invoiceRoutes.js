const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const router = express.Router();

router.post('/getAllInvoices', invoiceController.getAllInvoices);
router.post('/getInvoiceData', invoiceController.getInvoiceData);
router.post('/deleteInvoice', invoiceController.deleteInvoice)
router.post('/updateInvoice', invoiceController.updateInvoice)
router.post('/send-invoice', invoiceController.sendInvoice);
router.post('/getActiveInvoices', invoiceController.getActiveInvoiceNumber);

module.exports = router;