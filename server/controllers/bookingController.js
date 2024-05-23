const Booking = require("../models/Booking");
const User = require("../models/Users");
const Package = require("../models/Packages");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const axios = require("axios");
const Users = require("../models/Users");
const BusinessClients = require("../models/BusinessClients");
const { Op } = require("sequelize");
const moment = require("moment");

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const callback_uri = process.env.GOOGLE_CLIENT_CALLBACK;
const redirect_uri = "postmessage";

const oAuth2Client = new OAuth2(client_id, client_secret, callback_uri);

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

async function exchangeRefreshToken(refreshToken) {
  const response = await axios.post(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      refresh_token: refreshToken,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: "refresh_token",
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
  );

  return response.data;
}

function createOAuth2Client(accessToken) {
  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials({ access_token: accessToken });
  return oAuth2Client;
}

async function addevent(data) {
  try {
    // Find photographer admin with calendar_sub = 1
    let photographerAdmin = await Users.findOne({
      attributes: ["calendar_sub"],
      where: { id: data.subdomain_id, calendar_sub: 1 },
    });

    // Find photographers with calendar_sub = 1
    let photographers = [];
    if (data.photographer_id) {
      let photographerIds = data.photographer_id
        .split(",")
        .map((id) => id.trim());
      photographers = await Users.findAll({
        attributes: ["id", "calendar_sub"],
        where: {
          id: photographerIds,
          calendar_sub: 1,
        },
      });
    }

    // find user with data.user_id
    let theUser = await User.findOne({
      where: {
        id: data.user_id,
      },
    })

    let userIds = [data.subdomain_id];
    photographers.forEach((photographer) => userIds.push(photographer.id));
    if (theUser.calendar_sub == 1) {
      userIds.push(parseInt(data.user_id));
    }

    const theUsers = await Users.findAll({ where: { id: userIds } });

    const authResponses = await Promise.all(
      theUsers.map(async (user) => {
        const code = user.refresh_token;
        return await exchangeRefreshToken(code);
      })
    );


    const oAuth2Clients = authResponses.map((authResponse) =>
      createOAuth2Client(authResponse.access_token)
    );

    for (let i = 0; i < theUsers.length; i++) {
      const user = theUsers[i];
      const calendar = google.calendar({
        version: "v3",
        auth: oAuth2Clients[i],
      });
      const calendarId = user.calendar_id;

      const id = `123${data.id}`;

      const events = await calendar.events.list({
        calendarId: calendarId,
        singleEvents: true,
        orderBy: "startTime",
        showDeleted: true,
      });

      const existingEvent = events.data.items.find((event) => event.id === id);

      const calendarInfo = await calendar.calendars.get({ calendarId: calendarId });

      const timezone = calendarInfo.data.timeZone;

      const date = moment.tz(data.booking_date, timezone).set({
        hour: data.booking_time.split(":")[0],
        minute: data.booking_time.split(":")[1],
        second: 0,
      });

      const dateTo = moment.tz(data.booking_date, timezone).set({
        hour: data.booking_time_to.split(":")[0],
        minute: data.booking_time_to.split(":")[1],
        second: 0,
      });

      const bookingDate = date.clone().utc();
      const bookingDateTo = dateTo.clone().utc();

      if (existingEvent && existingEvent.status !== "cancelled") {
        const resp = updateEvent(
          calendar,
          calendarId,
          id,
          data,
          bookingDate,
          bookingDateTo
        );
      } else {
        const resp = insertEvent(
          calendar,
          calendarId,
          id,
          data,
          bookingDate,
          bookingDateTo
        );
      }
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to add event");
  }
}

async function updateEvent(calendar, calendarId, eventId, data, start, end) {
  if (!calendarId) {
    throw new Error("Missing required parameter: calendarId");
  }

  if (!eventId) {
    throw new Error("Missing required parameter: eventId");
  }

  try {
    const response = await calendar.events.update({
      calendarId: calendarId,
      eventId: eventId,
      resource: {
        id: eventId,
        summary: data.booking_title || "Untitled Event",
        start: {
          dateTime: start.toISOString(),
          timeZone: "UTC",
        },
        end: {
          dateTime: end.toISOString(),
          timeZone: "UTC",
        },
        status: "confirmed",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating event:", error.message);
    throw error;
  }
}

async function insertEvent(calendar, calendarId, eventId, data, start, end) {
  if (!calendarId) {
    throw new Error("Missing required parameter: calendarId");
  }
  return calendar.events.insert({
    calendarId: calendarId,
    resource: {
      id: eventId,
      summary: data.booking_title || "Untitled Event",
      start: {
        dateTime: start.toISOString(),
        timeZone: "Australia/Sydney",
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: "Australia/Sydney",
      },
      status: "confirmed",
    },
  });

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
  const events = await calendar.events.list({
    calendarId: theuser.calendar_id,
    singleEvents: true,
    orderBy: "startTime",
    showDeleted: true,
  });
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
    let subdomainId = req.body.subdomain_id;

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

    let booking;
    if (req.body.id) {
      booking = await Booking.findOne({ where: { id: req.body.id } });
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      await booking.update(data);
    } else {
      data.subdomain_id = subdomainId;
      booking = await Booking.create(data);
    }

    console.log('booking=========>>>', booking);

    try {
      await addevent(booking);
    } catch (error) {
      console.error("Failed to add event:", error.message);
      return res.status(500).json({ error: "Failed to add event" });
    }

    res.status(200).json({
      success: true,
      message: req.body.id
        ? "Booking updated successfully"
        : "Booking created successfully",
      booking: booking
    });
  } catch (error) {
    console.error("Failed to add booking:", error.message);
    res.status(500).json({ error: "Failed to add booking" });
  }
};

const providers = async (req, res) => {
  const { subdomainId } = req.body;
  try {
    const businessClients = await BusinessClients.findAll({
      attributes: ["client_id"],
      where: {
        business_id: subdomainId,
        status: 1,
      },
      include: {
        model: User,
        as: "client",
      },
    });

    let usersWithRoleId2 = await User.findAll({
      attributes: ["id", "name", "profile_photo"],
      where: {
        id: { [Op.in]: businessClients.map((client) => client.client_id) },
        role_id: 2,
      },
    });

    let subdomain = await User.findOne({
      attributes: ["id", "name", "profile_photo"],
      where: {
        id: subdomainId,
      },
    });

    // add this user in users with roleId 2
    usersWithRoleId2.push(subdomain);

    const users = await User.findAll({
      attributes: ["id", "name", "profile_photo", "address"],
      where: {
        id: { [Op.in]: businessClients.map((client) => client.client_id) },
        role_id: 3,
      },
    });

    const packages = await Package.findAll({
      attributes: ["id", "package_name", "package_price", "package_type"],
      where: {
        subdomain_id: subdomainId,
      },
    });

    res.json({ usersWithRoleId2, packages, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    if (req.body.roleId == 5) {
      let bookings = await Booking.findAll({
        where: { subdomain_id: req.body.subdomainId },
        include: [
          {
            model: User,
            attributes: ["name", "colorcode", "address"],
          },
        ],
      });
      res.status(200).json({ success: true, data: bookings });
    } else if (req.body.roleId == 3) {
      let bookings = await Booking.findAll({
        where: {
          subdomain_id: req.body.subdomainId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "colorcode", "address"],
          },
        ],
      });
      res.status(200).json({ success: true, data: bookings });
    } else if (req.body.roleId == 2) {
      let bookings = await Booking.findAll({
        where: {
          subdomain_id: req.body.subdomainId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "colorcode", "address"],
          },
        ],
      });

      bookings = bookings.filter((booking) => {
        return booking.photographer_id.includes(req.body.userId);
      });

      res.status(200).json({ success: true, data: bookings });
    }

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
    const bookingId = parseInt(req.body.id);
    let bookingData = await Booking.findOne({ where: { id: bookingId } });

    // Find photographer admin with calendar_sub = 1
    let photographerAdmin = await Users.findOne({
      attributes: ["calendar_sub"],
      where: { id: bookingData.subdomain_id, calendar_sub: 1 },
    });

    // Find photographers with calendar_sub = 1
    let photographers = [];
    if (bookingData.photographer_id) {
      let photographerIds = bookingData.photographer_id
        .split(",")
        .map((id) => id.trim());
      photographers = await Users.findAll({
        attributes: ["id", "calendar_sub"],
        where: {
          id: photographerIds,
          calendar_sub: 1,
        },
      });
    }
    // find client. client_id only has one client
    let clients = [];
    if (bookingData.user_id) {
      clients = await Users.findOne({
        attributes: ["calendar_sub"],
        where: { id: bookingData.user_id, calendar_sub: 1 },
      });
    }

    let userIds = [];

    if (photographerAdmin) {
      userIds.push(bookingData.subdomain_id);
      console.log(bookingData.subdomain_id);
    }
    if (clients) {
      userIds.push(bookingData.user_id);
      console.log(bookingData.user_id);
    }
    if (photographers) {
      photographers.forEach((photographer) => userIds.push(photographer.id));
    }

    console.log(userIds);

    const theUsers = await Users.findAll({ where: { id: userIds } });

    const authResponses = await Promise.all(
      theUsers.map(async (user) => {
        const code = user.refresh_token;
        return await exchangeRefreshToken(code);
      })
    );

    const oAuth2Clients = authResponses.map((authResponse) =>
      createOAuth2Client(authResponse.access_token)
    );

    for (let i = 0; i < theUsers.length; i++) {
      const oAuth2Client = oAuth2Clients[i];
      const calendarId = theUsers[i].calendar_id;
      const eventId = "123" + bookingId;
      const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
      const events = await calendar.events.list({
        calendarId: calendarId,
        singleEvents: true,
        orderBy: "startTime",
        showDeleted: true,
      });
      const existingEvent = events.data.items.find(
        (event) => event.id === eventId
      );
      if (!existingEvent) {
        continue;
      }
      const resp = calendar.events.delete({
        calendarId: calendarId,
        eventId: eventId,
      });
    }

    const deleted = await Booking.destroy({
      where: { id: bookingId },
    });

    let responseMessage = "Booking deleted successfully";
    let responseData = null;

    res.json({
      success: deleted,
      message: responseMessage,
      data: responseData,
    });
  } catch (error) {
    console.error("Failed to delete Booking:", error);
    res.status(500).json({ error: "Failed to delete Booking" });
  }
};

const getCalendarStatus = async (req, res) => {
  try {
    const resp = await User.findAll({
      attributes: ["calendar_sub"],
      where: { id: req.body.user_id },
    });
    res.status(200).json({ success: true, data: resp });
  } catch (error) {
    res.status(500).json({ error: "Failed to data." });
  }
}

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

const getAllBookingTitles = async (req, res) => {
  try {
    const bookingData = await Booking.findAll({
      where: { user_id: req.body.clientId },
    });

    const filteredResults = bookingData.filter((result) => {
      return result.booking_status == 1;
    });

    res.status(200).json({ success: true, data: filteredResults, bookingData });
  } catch (error) {
    res.status(500).json({ error: "Failed to data of booking" });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Booking.findAll({
      where: {
        user_id: req.body.clientId,
        booking_title: req.body.booking_title,
      },
      attributes: ["package_ids"],
    });
    let serviceIds = services.map((service) => service.package_ids);
    const idsAsIntegers = serviceIds[0]
      .split(",")
      .map((id) => parseInt(id.trim(), 10));
    const servicesData = await Package.findAll({
      where: {
        id: idsAsIntegers,
      },
    });
    res.status(200).json({ success: true, data: servicesData });
  } catch (error) {
    res.status(500).json({ error: "Failed to data of booking" });
  }
};

const getAllPhotographers = async (req, res) => {
  try {
    const photographers = await Booking.findAll({
      where: {
        user_id: req.body.clientId,
        booking_title: req.body.booking_title,
      },
      attributes: ["photographer_id"],
    });
    let photographerIds = photographers.map(
      (photographer) => photographer.photographer_id
    );
    const idsAsIntegers = photographerIds[0]
      .split(",")
      .map((id) => parseInt(id.trim(), 10));
    const photographersData = await User.findAll({
      where: {
        id: idsAsIntegers,
      },
    });
    res.status(200).json({ success: true, data: photographersData });
  } catch (error) {
    res.status(500).json({ error: "Failed to data of booking" });
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
  getAllBookingTitles,
  getAllServices,
  getAllPhotographers,
  getCalendarStatus
};
