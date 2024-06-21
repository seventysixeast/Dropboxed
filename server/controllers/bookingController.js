const Booking = require("../models/Booking");
const User = require("../models/Users");
const Package = require("../models/Packages");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const axios = require("axios");
const Users = require("../models/Users");
const BusinessClients = require("../models/BusinessClients");
const Notifications = require('../models/Notifications');
const Packages = require('../models/Packages');
const { Op } = require("sequelize");
const moment = require("moment");
const { NEW_CLIENT_BOOKING, UPDATE_CLIENT_BOOKING, NEW_PHOTOGRAPHER_TEAM_BOOKING, UPDATE_PHOTOGRAPHER_TEAM_BOOKING } = require('../helpers/emailTemplate');
const { sendEmail } = require("../helpers/sendEmail");

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
    let photographerAdmin = await Users.findOne({
      attributes: ['id', "calendar_sub"],
      where: { id: data.subdomain_id, calendar_sub: 1 },
    });

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

    let theUser = await User.findOne({
      where: {
        id: data.user_id,
      },
    });

    let userIds = [];

    if (photographerAdmin) {
      userIds.push(photographerAdmin.id);
    }
    if (photographers) {
      photographers.forEach((photographer) => {
        userIds.push(photographer.id);
      });
    }

    if (theUser.calendar_sub == 1) {
      userIds.push(parseInt(data.user_id));
    }

    let theUsers = await Users.findAll({ where: { id: userIds } });

    const authResponses = await Promise.all(
      theUsers.map(async (user) => {
        const code = user.refresh_token;
        try {
          return await exchangeRefreshToken(code);
        } catch (error) {
          console.error(`Error refreshing token for user ${user.id}:`, error);
          return null;
        }
      })
    );

    const oAuth2Clients = authResponses.map((authResponse, index) => {
      if (authResponse) {
        return createOAuth2Client(authResponse.access_token);
      } else {
        return null;
      }
    });

    for (let i = 0; i < theUsers.length; i++) {
      const user = theUsers[i];
      if (!oAuth2Clients[i]) {

        const userToUpdate = await User.findOne({
          where: { id: user.id },
        });
        if (userToUpdate) {
          userToUpdate.access_token = "";
          userToUpdate.refresh_token = "";
          userToUpdate.calendar_sub = 0;
          userToUpdate.calendar_id = "";

          await userToUpdate.save();
        }
        continue;
      }


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

  let packageNames = "";
  if (data.package_ids) {
    const packageIds = data.package_ids.split(", ").map((id) => parseInt(id));
    const packages = await Package.findAll({
      where: { id: packageIds },
      attributes: ["package_name"],
    });
    packageNames = packages.map((package) => package.package_name).join(", ");
  }

  let photographerNames = "";
  if (data.photographer_id) {
    const photographerIds = data.photographer_id
      .split(", ")
      .map((id) => parseInt(id));
    const photographers = await Users.findAll({
      where: { id: photographerIds },
      attributes: ["name"],
    });
    photographerNames = photographers
      .map((photographer) => photographer.name)
      .join(", ");
  }
  if (photographerNames === "") {
    photographerNames = "N/A";
  }
  const user = await User.findOne({
    where: { id: data.subdomain_id },
    attributes: ["name", "email"],
  });

  try {
    const response = await calendar.events.update({
      calendarId: calendarId,
      eventId: eventId,
      resource: {
        id: eventId,
        summary: `Services: ${packageNames}`,
        description: `Client Name: ${data.client_name}, Provider Name: ${photographerNames}`,
        location: `${data.booking_title}`,
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
      attendees: [
        {
          email: user.email,
          displayName: user.name,
          organizer: true,
        }
      ],
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
  let packageNames = "";
  if (data.package_ids) {
    const packageIds = data.package_ids.split(", ").map((id) => parseInt(id));
    const packages = await Package.findAll({
      where: { id: packageIds },
      attributes: ["package_name"],
    });
    packageNames = packages.map((package) => package.package_name).join(", ");
  }

  let photographerNames = "";
  if (data.photographer_id) {
    const photographerIds = data.photographer_id
      .split(", ")
      .map((id) => parseInt(id));
    const photographers = await Users.findAll({
      where: { id: photographerIds },
      attributes: ["name"],
    });
    photographerNames = photographers
      .map((photographer) => photographer.name)
      .join(", ");
  }
  if (photographerNames === "") {
    photographerNames = "N/A";
  }
  // find user with data.subdomain_id and get the name and email
  const user = await User.findOne({
    where: { id: data.subdomain_id },
    attributes: ["name", "email"],
  });


  return calendar.events.insert({
    calendarId: calendarId,
    resource: {
      id: eventId,
      summary: `Services: ${packageNames}`,
      description: `Client Name: ${data.client_name}, Provider Name: ${photographerNames}`,
      location: `${data.booking_title}`,
      start: {
        dateTime: start.toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: "UTC",
      },
      status: "confirmed",
      attendees: [
        {
          email: user.email,
          displayName: user.name,
          organizer: true,
        }
      ],
    },
  });
}

const createBooking = async (req, res) => {
  try {
    const data = req.body;
    const subdomainId = data.subdomain_id;

    // Fetch user details
    const user = await User.findOne({
      where: { id: data.user_id },
      attributes: ["name", "address", "email"]
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { name: client_name, address: client_address, email: client_email } = user;

    data.client_address = client_address || "";
    data.client_name = client_name || "";
    data.client_email = client_email || "";

    // Fetch subdomain user details
    const subdomain_user = await User.findOne({
      where: { id: subdomainId },
      attributes: ['subdomain', 'logo', 'phone', 'address']
    });

    const photographerIds = data.photographer_id.split(',').map(id => parseInt(id.trim(), 10)).filter(Number.isInteger);
    const photographers = await User.findAll({
      where: { id: photographerIds },
      attributes: ['email', 'name', 'phone']
    });

    const teamMembers = photographers.map(photographer => photographer.name).join(', ');
    const contacts = photographers.map(photographer => photographer.phone).join(', ');

    const packageIds = data.package_ids.split(',').map(id => parseInt(id.trim(), 10)).filter(Number.isInteger);
    const services = await Package.findAll({
      where: { id: packageIds },
      attributes: ['package_name']
    });
    const serviceNames = services.map(service => service.package_name).join(', ');

    let booking;

    if (data.id) {
      booking = await Booking.findOne({ where: { id: data.id } });

      if (data.booking_status === true || parseInt(data.booking_status) === 1) {
        const isDateTimeChanged = booking.booking_date !== data.booking_date || booking.booking_time !== data.booking_time || booking.booking_time_to !== data.booking_time_to;

        if (isDateTimeChanged) {
          const SEND_EMAIL = isDateTimeChanged ?
            UPDATE_CLIENT_BOOKING(subdomain_user.subdomain, subdomain_user.logo, subdomain_user.phone, subdomain_user.address, client_name, data, contacts, teamMembers, serviceNames) :
            NEW_CLIENT_BOOKING(subdomain_user.subdomain, subdomain_user.logo, subdomain_user.phone, subdomain_user.address, client_name, data, contacts, teamMembers, serviceNames);

          sendEmail(client_email, isDateTimeChanged ? "Update Booking" : "New Booking", SEND_EMAIL);

          // Create notification
          await Notifications.create({
            notification: `Your appointment has been ${isDateTimeChanged ? 'updated' : 'confirmed'} with ${subdomain_user.subdomain}`,
            client_id: data.user_id,
            subdomain_id: subdomainId,
            date: new Date()
          });

          // Notify photographer team
          photographers.forEach(photographer => {
            const SEND_EMAIL_PHOTOGRAPHER = isDateTimeChanged ?
              UPDATE_PHOTOGRAPHER_TEAM_BOOKING(subdomain_user.subdomain, subdomain_user.logo, subdomain_user.phone, subdomain_user.address, photographer.name, data, contacts, teamMembers, serviceNames) :
              NEW_PHOTOGRAPHER_TEAM_BOOKING(subdomain_user.subdomain, subdomain_user.logo, subdomain_user.phone, subdomain_user.address, photographer.name, data, contacts, teamMembers, serviceNames);

            sendEmail(photographer.email, isDateTimeChanged ? "Update Booking" : "New Booking", SEND_EMAIL_PHOTOGRAPHER);
          });
        }
      }

      await booking.update(data);
    } else {
      if (data.booking_status === true) {
        // For client
        const SEND_EMAIL = NEW_CLIENT_BOOKING(subdomain_user.subdomain, subdomain_user.logo, subdomain_user.phone, subdomain_user.address, client_name, data, contacts, teamMembers, serviceNames);
        sendEmail(client_email, "New Booking", SEND_EMAIL);

        // Create notification
        await Notifications.create({
          notification: `Your appointment has been confirmed with ${subdomain_user.subdomain}`,
          client_id: data.user_id,
          subdomain_id: subdomainId,
          date: new Date()
        });

        // Notify photographer team
        photographers.forEach(photographer => {
          const SEND_EMAIL_PHOTOGRAPHER = NEW_PHOTOGRAPHER_TEAM_BOOKING(subdomain_user.subdomain, subdomain_user.logo, subdomain_user.phone, subdomain_user.address, photographer.name, data, contacts, teamMembers, serviceNames);
          sendEmail(photographer.email, "New Booking", SEND_EMAIL_PHOTOGRAPHER);
        });
      }

      data.subdomain_id = subdomainId;
      booking = await Booking.create(data);
    }

    await addevent(booking);

    res.status(200).json({
      success: true,
      message: data.id ? "Booking updated successfully" : "Booking created successfully",
      booking: booking
    });
  } catch (error) {
    console.error("Failed to add booking:", error.message);
    res.status(500).json({ error: "Failed to add booking" });
  }
};


const providers = async (req, res) => {
  let subdomainId = req.body.subdomain_id;
  let roleId = req.body.role_id;
  try {
    const businessClients = await BusinessClients.findAll({
      attributes: ["client_id"],
      where: {
        business_id: subdomainId,
        status: 1,
      },
    });

    let usersWithRoleId2 = await User.findAll({
      attributes: ["id", "name", "profile_photo", "status"],
      where: {
        id: { [Op.in]: businessClients.map((client) => client.client_id) },
        role_id: 2,
        status: 'Active',
      },
    });

    let subdomain = await User.findOne({
      attributes: ["id", "name", "profile_photo", "status"],
      where: {
        id: subdomainId,
      },
    });

    usersWithRoleId2.push(subdomain);

    const users = await User.findAll({
      attributes: ["id", "name", "profile_photo", "address", "status"],
      where: {
        id: { [Op.in]: businessClients.map((client) => client.client_id) },
        role_id: 3,
        status: 'Active',
      },
    });

    const packages = await Package.findAll({
      attributes: ["id", "package_name", "package_price", "package_type", 'show_price'],
      where: {
        subdomain_id: subdomainId,
        status: 'Active',
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

    let photographerAdmin = await Users.findOne({
      attributes: ["calendar_sub"],
      where: { id: bookingData.subdomain_id, calendar_sub: 1 },
    });

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
    }
    if (clients) {
      userIds.push(bookingData.user_id);
    }
    if (photographers) {
      photographers.forEach((photographer) => userIds.push(photographer.id));
    }

    const theUsers = await Users.findAll({ where: { id: userIds } });

    const authResponses = await Promise.all(
      theUsers.map(async (user) => {
        const code = user.refresh_token;
        try {
          return await exchangeRefreshToken(code);
        } catch (error) {
          console.error(`Error refreshing token for user ${user.id}:`, error);
          return null;
        }
      })
    );


    const oAuth2Clients = authResponses.map((authResponse, index) => {
      if (authResponse) {
        return createOAuth2Client(authResponse.access_token);
      } else {
        return null;
      }
    });

    for (let i = 0; i < theUsers.length; i++) {
      const user = theUsers[i];
      const oAuth2Client = oAuth2Clients[i];
      if (!oAuth2Clients[i]) {

        const userToUpdate = await User.findOne({
          where: { id: user.id },
        });
        if (userToUpdate) {
          userToUpdate.access_token = "";
          userToUpdate.refresh_token = "";
          userToUpdate.calendar_sub = 0;
          userToUpdate.calendar_id = "";

          await userToUpdate.save();
        }
        continue;
      }
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
    const [updated] = await Booking.update(req.body, {
      where: { id: bookingId },
    });

    if (updated) {
      const updatedBooking = await Booking.findOne({
        where: { id: bookingId },
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      });

      if (!updatedBooking) {
        return res.status(404).json({ error: "Booking not found after update" });
      }

      const client_id = updatedBooking.User.id;
      const client_name = updatedBooking.User.name;
      const client_email = updatedBooking.User.email;

      const subdomain_user = await User.findOne({
        where: { id: updatedBooking.subdomain_id },
        attributes: ['id', 'subdomain', 'logo', 'phone', 'address']
      });

      const photographer_team = await User.findAll({
        where: {
          id: updatedBooking.photographer_id.split(',')
        },
        attributes: ['email', 'name', 'phone']
      });

      const teamMembers = photographer_team.map(photographer => photographer.name).join(', ');
      const contacts = photographer_team.map(photographer => photographer.phone).join(', ');

      const services = await Package.findAll({
        where: {
          id: updatedBooking.package_ids.split(',')
        },
        attributes: ['package_name']
      });

      const serviceNames = services.map(service => service.package_name).join(', ');

      // For client
      const SEND_EMAIL_CLIENT = NEW_CLIENT_BOOKING(
        subdomain_user.subdomain, subdomain_user.logo, subdomain_user.phone, subdomain_user.address,
        client_name, updatedBooking, contacts, teamMembers, serviceNames
      );
      sendEmail(client_email, "New Booking", SEND_EMAIL_CLIENT);

      // Create notification
      await Notifications.create({
        notification: `Your appointment has been updated with ${subdomain_user.subdomain}`,
        client_id: client_id,
        subdomain_id: subdomain_user.id,
        date: new Date()
      });

      // For photographer team
      photographer_team.forEach(photographer => {
        const SEND_EMAIL_PHOTOGRAPHER = NEW_PHOTOGRAPHER_TEAM_BOOKING(
          subdomain_user.subdomain, subdomain_user.logo, subdomain_user.phone, subdomain_user.address,
          photographer.name, updatedBooking, contacts, teamMembers, serviceNames
        );
        sendEmail(photographer.email, "New Booking", SEND_EMAIL_PHOTOGRAPHER);
      });

      res.status(200).json({
        success: true,
        message: "Booking updated successfully"
      });
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.error(error);
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

const getCollectionServices = async (req, res) => {
  let services = req.body;

  console.log(services);
  try {
    const idsAsIntegers = services.serviceIds
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
}

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
  getCalendarStatus,
  getCollectionServices
};
