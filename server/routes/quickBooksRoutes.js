const express = require('express');
const quickBooksController = require('../controllers/quickBooksController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Step 1: Get the OAuth request token
router.get('/requestToken', authenticateToken, quickBooksController.requestToken);

// Step 2: Handle the OAuth callback
router.get('/callback', quickBooksController.callback);

module.exports = router;
