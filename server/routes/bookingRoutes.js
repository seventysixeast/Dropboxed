// routes/bookings.js

const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Route for creating a new booking
router.post('/new-booking', bookingController.createBooking);
router.get('/get-bookings', bookingController.getAllBookings);
router.get('/providers', bookingController.providers)
router.post('/create-calender', bookingController.createBooking)
router.get('/getAllBookings', bookingController.getAllBookings)
router.post('/deleteBooking', bookingController.deleteBooking);
router.post('/updateBooking', bookingController.updateBooking);

module.exports = router;