const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/verify-email', authController.verifyEmail);
router.post('/google', authController.google);
router.post('/google-drive', authController.googleDrive);
router.post('/client-signup', authController.clientSignup);
router.post('/verify-token', authController.verifyToken);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/dropbox-auth', authController.dropboxAuth)

module.exports = router;

