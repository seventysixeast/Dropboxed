// controllers/bookingController.js

const Booking = require("../models/Booking");
const User = require("../models/Users");
const Package = require("../models/Packages");
const fs = require("fs");
const md5 = require("md5");

const createBooking = async (req, res) => {
  try {
    console.log(req.body);

    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    console.error("Failed to add booking:", error.message);
    res.status(500).json({ error: "Failed to add booking" });
  }
};

const providers = async (req, res) => {
  try {
    const usersWithRoleId1 = await User.findAll({
      where: { role_id: 1 },
      attributes: ["id", "name", "profile_photo"],
    });

    const users = await User.findAll({ 
      attributes: ["id", "name", "profile_photo"],
    });

    // Fetch all packages
    const packages = await Package.findAll({
      attributes: ["id", "package_name", "package_price", "package_type"],
      where: { status: "Active" },
    });

    res.json({ usersWithRoleId1, packages, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

function dateToCal(timestamp) {
  return (
    new Date(timestamp).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  );
}

const createCalendar = async (req, res) => {
  try {
    const { user_id } = req.body;
    const results = await Booking.findAll({
      where: { user_id: user_id },
    });

    console.log(results);

    if (!results) {
      return res.status(404).json({ error: "Booking not found" });
    }

    let ical = `BEGIN:VCALENDAR
            VERSION:2.0
            PRODID:-www.admin.mediadrive.com.au
            CALSCALE:GREGORIAN`;

    results.forEach((order) => {
      const booking_id = order.id;
      const client_name = order.client_name;
      const client_address = order.client_address;
      const booking_title = order.booking_title;
      const booking_date = order.booking_date;
      const booking_time = order.booking_time;
      const booking_time_to = order.booking_time_to;

      const booking_start_date = new Date(
        `${booking_date} ${booking_time}`
      ).getTime();
      const booking_end_date = new Date(
        `${booking_date} ${booking_time_to}`
      ).getTime();

      const description = `Package: ${order.package_name}, Services: ${order.service_names}, Client Name: ${client_name}`;

      ical += `
            BEGIN:VEVENT
            UID:${md5(booking_title + booking_id)}
            DTSTAMP:${dateToCal(Date.now())}
            DESCRIPTION:${description}
            LOCATION:${client_address}
            SUMMARY:${booking_title}
            DTSTART:${dateToCal(booking_start_date)}
            DTEND:${dateToCal(booking_end_date)}
            END:VEVENT`;
    });

    ical += `
            END:VCALENDAR`;

    // Write iCal data to file
    const directory = `ics_files/${user_id}`;
    const filename = `booking_${user_id}.ics`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    fs.writeFileSync(`${directory}/${filename}`, ical);

    res.send(filename);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
      let bookings = await Booking.findAll({
          include: [{
              model: User,
              attributes: ['name', 'colorcode', 'address'],
              where: {
                  role_id: 3
              }
          }],
          attributes: ['id', 'booking_date', 'booking_time', 'comment', 'booking_status']
      });
      console.log(bookings);
      res.status(200).json({ success: true, data: bookings });
  } catch (error) {
      res.status(500).json({ error: "Failed to list bookings" });
  }
};

module.exports = {
  createBooking,
  providers,
  createCalendar,
  getAllBookings
};
