const express = require('express');
const notificationController = require('../controllers/notificationController');
const router = express.Router();

router.post('/getAllNotifications', notificationController.getAllNotifications);
router.post('/deleteNotification', notificationController.deleteNotification);

module.exports = router;