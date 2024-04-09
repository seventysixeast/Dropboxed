const express = require('express');
const calenderController = require('../controllers/calenderController');
const router = express.Router();


router.post('/addcalenderevent', calenderController.addevent);

module.exports = router;