// controllers/bookingController.js

const Booking = require('../models/Booking');
const User = require('../models/User');
const Package = require('../models/Packages'); 

// Controller function for creating a new booking
const createBooking = async (req, res) => {
    try {
        console.log(req.body);
        // Assuming req.body contains the booking data
        const booking = await Booking.create(req.body);
        res.status(201).json(booking); // Respond with the created booking
    } catch (error) {
        console.error("Failed to add booking:", error.message);
        res.status(500).json({ error: "Failed to add booking" });
    }
};


const providers = async (req, res) => {
    try {
        // Fetch users with role_id 1 (providers)
        const usersWithRoleId1 = await User.findAll({
            where: { role_id: 1 },
            attributes: ['id', 'name', 'profile_photo']
        });

        // Fetch all packages
        const packages = await Package.findAll({
            attributes: ['id', 'package_name', 'package_price'],
            where: { status: 'Active' }
        });
        

        res.json({usersWithRoleId1, packages});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createBooking, providers
};
