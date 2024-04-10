// controllers/bookingController.js

const Booking = require("../models/Booking");
const User = require("../models/Users");
const Package = require("../models/Packages");
const fs = require("fs");
const md5 = require("md5");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const axios = require("axios");
const Users = require("../models/Users");

const oAuth2Client = new OAuth2(
  "49494450157-past37o3hghtbn0vd7mn220ub5u975ef.apps.googleusercontent.com",
  "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",
  "http://localhost:3000/auth/google/callback"
);

oAuth2Client.setCredentials({
  access_token:
    "ya29.a0Ad52N39O7YTV2QnDUbI3hN9t_Sf_TPXOkb0Wzu-TbsR9gyPYCamzkMa0UkOT7xeK8WLdlanKhSlhpXu_oOHkI9RGCCMs2M9SM_nMjch2hPIIAJ1EeYJMthiA79FQqvIAQlBkRSvBC2waVCP_kDv90tE_ZG4xAegLplGYaCgYKAe8SARASFQHGX2Mi9sP8FgfhQ7uW3wZd4ZUYRA0171",
});

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.readonly",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.app.created",
  "https://www.googleapis.com/auth/calendar.readonly",
];
const tokenEndpoint = "https://oauth2.googleapis.com/token";
const authorizationCode =
  "4/0AeaYSHBwjSq5-UPOC2M4_piiMi273mhISRZewsb7ESik4n-OxvN3aKQwgiApS4IymwJAXQ";

const tokenRequestBody = {
  code: authorizationCode,
  client_id:
    "49494450157-past37o3hghtbn0vd7mn220ub5u975ef.apps.googleusercontent.com",
  client_secret: "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",
  redirect_uri: "http://localhost:3000/auth/google/callback",
  grant_type: "authorization_code",
};

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

async function getTokens() {
  try {
    const response = await axios.post(tokenEndpoint, tokenRequestBody);
    console.log(response);
    const tokens = response;
    return tokens;
  } catch (error) {
    console.error(
      "Error exchanging authorization code for tokens:",
      error.response
    );
    throw error;
  }
}

async function getCalendarList() {
  try {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const response = await calendar.calendarList.list();
    const calendars = response.data.items;
    return calendars;
  } catch (error) {
    console.error("Error fetching calendar list:", error);
    throw error;
  }
}

async function createCalendar() {
  try {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const calendarName = "dropboxed";

    const response = await calendar.calendars.insert({
      requestBody: {
        summary: calendarName,
      },
    });

    console.log("Calendar created:", response.data.id);
  } catch (error) {
    console.error("Error creating calendar:", error);
    throw error;
  }
}

// const addevent = async (req, res) => {
//   const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
//   // await createCalendar()
//   // const calendarsMy = await getCalendarList();

//   const events = await calendar.events.list({
//     calendarId: "c17bb61364a8fff468066de3a7b884a8cbe83e61ad9b47cf633f34b4d01d1297@group.calendar.google.com",
//     singleEvents: true,
//     orderBy: "startTime",
//   });
//   //prevent readding same event if booking_id is same
//   if (events.data.items.find((event) => event.id === req.body.event.id)) {
//     return res.status(400).json({
//       message: "event already exists",
//       events
//     });
//   }

//   const resp = await calendar.events.insert({
//     calendarId: "c17bb61364a8fff468066de3a7b884a8cbe83e61ad9b47cf633f34b4d01d1297@group.calendar.google.com",
//     resource: req.body.event,
//     events
//   });

//   res.status(200).json({
//     message: "event added",
//     events
//   });
// };

async function addevent(data) {
  console.log(data);

  let theuser = await Users.findOne({ where: { id: data.user_id } });
  oAuth2Client.setCredentials({
    access_token: theuser.access_token
  });
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  // const events = await calendar.events.list({
  //   calendarId: theuser.calendar_id,
  //   singleEvents: true,
  //   orderBy: "startTime",
  // });

  const resp = await calendar.events.insert({
    calendarId: theuser.calendar_id,
    resource: {
      summary: data.booking_title || 'Untitled Event',
      start: {
        dateTime: data.booking_date,
        timeZone: 'UTC',
      },
      end: {
        dateTime: data.booking_date_to || data.booking_date,
        timeZone: 'UTC',
      },
    },
  });

  return resp;
}

const createBooking = async (req, res) => {
  try {
    let data = req.body;
    const usersWithRoleId1 = await User.findAll({
      where: { id: req.body.user_id },
      attributes: ["id", "name", "address"],
    });
    const { name, address } = usersWithRoleId1[0];
    let client_address;
    let client_name;
    client_address = address;
    client_name = name;
    data.client_address = client_address;
    data.client_name = client_name;
    data.booking_title = client_address;

    let booking;
    if (req.body.id) {
      booking = await Booking.findOne({ where: { id: req.body.id } });
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      await booking.update(data);
    } else {
      booking = await Booking.create(data);
    }
    let theuser = await Users.findOne({ where: { id: booking.user_id } });

    if (theuser.calendar_sub == 1) {
      await addevent(booking);
    }

    res.status(200).json({
      success: true,
      message: req.body.id
        ? "Booking updated successfully"
        : "Booking created successfully",
      data: booking,
      theuser,
    });
  } catch (error) {
    console.error("Failed to add booking:", error.message);
    res.status(500).json({ error: "Failed to add booking" });
  }
};

const providers = async (req, res) => {
  try {
    const usersWithRoleId1 = await User.findAll({
      where: { role_id: 2 },
      attributes: ["id", "name", "profile_photo"],
    });

    const users = await User.findAll({
      attributes: ["id", "name", "profile_photo"],
    });

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

const getAllBookings = async (req, res) => {
  try {
    let bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "colorcode", "address"],
          where: {
            role_id: 3,
          },
        },
      ],
    });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ error: "Failed to list bookings" });
  }
};

const getBooking = async (req, res) => {
  try {
    const bookingData = await Booking.findOne({ where: { id: req.body.id } });
    res.status(200).json({ success: true, data: bookingData });
  } catch (error) {
    res.status(500).json({ error: "Failed to data of booking" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.body.id;
    const deleted = await Booking.destroy({
      where: { id: bookingId },
    });
    if (deleted) {
      res
        .status(200)
        .json({ success: true, message: "Booking deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Booking" });
  }
};

const updateBooking = async (req, res) => {
  try {
    const bookingId = req.body.id;
    const updated = await Booking.update(req.body, {
      where: { id: bookingId },
    });
    if (updated) {
      res
        .status(200)
        .json({ success: true, message: "Booking updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update Booking" });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  providers,
  createCalendar,
  getBooking,
  deleteBooking,
  updateBooking,
};
