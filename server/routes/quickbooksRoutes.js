const express = require('express');
const quickbooksController = require('../controllers/quickbooksController');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/auth-url', authenticateToken, quickbooksController.getQuickBooksAuthUrl);
router.get('/callback', quickbooksController.quickBooksCallback);

module.exports = router;
