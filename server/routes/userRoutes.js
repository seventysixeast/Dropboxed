const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/getUser', userController.getUser);
router.post('/updateUser', userController.updateUser);
router.post('/changePassword', userController.changePassword);

module.exports = router;