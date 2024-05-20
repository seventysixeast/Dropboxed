const express = require('express');
const router = express.Router();
const dropboxController = require('../controllers/dropboxController');

router.get('/webhook', dropboxController.handleGetWebhook);
router.post('/webhook', dropboxController.handlePostWebhook);

module.exports = router;
