// routes/bookings.js

const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Route for creating a new booking
router.post('/new-booking', bookingController.createBooking);
router.post('/get-bookings', bookingController.getAllBookings);
router.get('/providers', bookingController.providers)
router.post('/create-calender', bookingController.createBooking)
router.post('/getAllBookings', bookingController.getAllBookings)
router.post('/getBooking', bookingController.getBooking);
router.post('/deleteBooking', bookingController.deleteBooking);
router.post('/updateBooking', bookingController.updateBooking);

module.exports = router;