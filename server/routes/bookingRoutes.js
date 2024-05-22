const express = require('express');
const bookingController = require('../controllers/bookingController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/new-booking', bookingController.createBooking);
router.post('/get-bookings', bookingController.getAllBookings);
router.post('/providers', bookingController.providers);
router.post('/create-calender', bookingController.createBooking);
router.post('/getAllBookings', bookingController.getAllBookings);
router.post('/getBooking', bookingController.getBooking);
router.post('/deleteBooking', bookingController.deleteBooking);
router.post('/updateBooking', bookingController.updateBooking);
router.post('/getAllBookingTitles', bookingController.getAllBookingTitles);
router.post('/getAllServices', bookingController.getAllServices);
router.post('/getAllPhotographers', bookingController.getAllPhotographers);

module.exports = router;