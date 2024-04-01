// routes/bookings.js

const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

// Route for creating a new booking
router.post('/new-booking', async (req, res) => {
    try {
        console.log(req.body);
        // Assuming req.body contains the booking data
        const booking = await Booking.create(req.body);
        res.status(201).json(booking); // Respond with the created booking
    } catch (error) {
        console.error("Failed to add booking:", error.message);
        res.status(500).json({ error: "Failed to add booking" });
    }
});

module.exports = router;
