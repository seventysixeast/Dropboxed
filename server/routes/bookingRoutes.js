// routes/bookings.js

const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Route for creating a new booking
router.post('/new-booking', bookingController.createBooking);

module.exports = router;
