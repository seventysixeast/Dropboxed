// controllers/bookingController.js

const Booking = require("../models/Booking");
const User = require("../models/Users");
const Package = require("../models/Packages");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const axios = require("axios");
const Users = require("../models/Users");

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_CALLBACK
);

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri = "postmessage";

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
  } catch (error) {
    console.error("Error creating calendar:", error);
    throw error;
  }
}

async function addevent(data, userID) {
  let theuser = await Users.findOne({ where: { id: userID } });
  let code = theuser.dataValues.refresh_token;
  let grant_type = "refresh_token";

  const response = await axios
    .post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        refresh_token: code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
        scope:
          "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.readonly",
        access_type: "offline",
        prompt: "consent",
        include_granted_scopes: "true",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Refresh token exchange error:", error);
      throw new Error("Refresh token exchange error");
    });

  const tokens = response;
  oAuth2Client.setCredentials({
    access_token: tokens.access_token,
  });
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  const id = "123" + data.id;

  const events = await calendar.events.list({
    calendarId: theuser.calendar_id,
    singleEvents: true,
    orderBy: "startTime",
    showDeleted: true,
  });
  const existingEvent = events.data.items.find((event) => event.id === id);

  if (existingEvent && existingEvent.status !== "cancelled") {
    const resp = await calendar.events.update({
      calendarId: theuser.calendar_id,
      eventId: id,
      resource: {
        id: id,
        summary: data.booking_title || "Untitled Event",
        start: {
          dateTime: data.booking_date,
          timeZone: "UTC",
        },
        end: {
          dateTime: data.booking_date_to || data.booking_date,
          timeZone: "UTC",
        },
        status: data.status || "confirmed",
      },
    });
    return;
  } else {
    const resp = await calendar.events.insert({
      calendarId: theuser.calendar_id,
      resource: {
        id: id,
        summary: data.booking_title || "Untitled Event",
        start: {
          dateTime: data.booking_date,
          timeZone: "UTC",
        },
        end: {
          dateTime: data.booking_date_to || data.booking_date,
          timeZone: "UTC",
        },
        status: data.status || "confirmed",
      },
    });
    return;
  }
}

async function deleteevent(bookingId, userId) {

  let theuser = await Users.findOne({ where: { id: userId } });
  let code = theuser.dataValues.refresh_token;
  let grant_type = "refresh_token";

  const response = await axios
    .post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        refresh_token: code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
        scope:
        "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.readonly",
        access_type: "offline",
        prompt: "consent",
        include_granted_scopes: "true",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Refresh token exchange error:", error);
        throw new Error("Refresh token exchange error");
      });

      const tokens = response;
      oAuth2Client.setCredentials({
        access_token: tokens.access_token,
      });
      const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
      const id = "123" + bookingId;
      //get event list
      const events = await calendar.events.list({
        calendarId: theuser.calendar_id,
        singleEvents: true,
        orderBy: "startTime",
        showDeleted: true,
      });
      //find the event with the matching id
      const existingEvent = events.data.items.find((event) => event.id === id);
      if (!existingEvent) {
        return;
      }
      const resp = await calendar.events.delete({
        calendarId: theuser.calendar_id,
        eventId: id,
      });
      return resp;
    }

const createBooking = async (req, res) => {
  try {
    let data = req.body;
    let userID = req.body.user_id;
    const usersWithRoleId1 = await User.findAll({
      where: { id: req.body.user_id },
      attributes: ["id", "name", "address"],
    });
    let client_address;
    let client_name;
    client_address = usersWithRoleId1[0].address || "";
    client_name = usersWithRoleId1[0].name || "";
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

    let theUser = await Users.findOne({
      attributes: ["calendar_sub"],
      where: { id: userID },
    });

    if (theUser && theUser.calendar_sub == 1) {
      // Use try-catch to handle the asynchronous addevent function
      try {
        await addevent(booking, userID);
      } catch (error) {
        console.error("Failed to add event:", error.message);
        // Handle the error from addevent function
        return res.status(500).json({ error: "Failed to add event" });
      }
    }

    res.status(200).json({
      success: true,
      message: req.body.id
        ? "Booking updated successfully"
        : "Booking created successfully",
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
      attributes: ["id", "name", "profile_photo", "address"],
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
      include: [{
        model: User,
        attributes: ['name', 'colorcode', 'address']
      }]
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
    const userId = req.body.user_id;
    const deleted = await Booking.destroy({
      where: { id: bookingId },
    });

    let responseMessage = "Booking deleted successfully";
    let responseData = null;

    if (deleted) {
      let theUser = await Users.findOne({
        attributes: ["calendar_sub"],
        where: { id: userId },
      });

      if (theUser && theUser.calendar_sub == 1) {
        // Delete event from calendar
        try {
          responseData = await deleteevent(bookingId, userId);
        } catch (error) {
          console.error("Error deleting event:", error);
          responseMessage = "Error deleting event";
        }
      }
    } else {
      responseMessage = "Booking not found";
      res.status(404);
    }

    res.json({ success: deleted, message: responseMessage, data: responseData });
  } catch (error) {
    console.error("Failed to delete Booking:", error);
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
