const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/verify-token', authController.verifyToken);

module.exports = router;
