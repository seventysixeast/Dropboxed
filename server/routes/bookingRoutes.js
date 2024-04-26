const express = require('express');
const bookingController = require('../controllers/bookingController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/new-booking', authenticateToken, bookingController.createBooking);
router.post('/get-bookings', authenticateToken, bookingController.getAllBookings);
router.post('/providers', authenticateToken, bookingController.providers);
router.post('/create-calender', authenticateToken, bookingController.createBooking);
router.post('/getAllBookings', authenticateToken, bookingController.getAllBookings);
router.post('/getBooking', authenticateToken, bookingController.getBooking);
router.post('/deleteBooking', authenticateToken, bookingController.deleteBooking);
router.post('/updateBooking', authenticateToken, bookingController.updateBooking);
router.post('/getAllBookingTitles', authenticateToken, bookingController.getAllBookingTitles);
router.post('/getAllServices', authenticateToken, bookingController.getAllServices);
router.post('/getAllPhotographers', authenticateToken, bookingController.getAllPhotographers);

module.exports = router;