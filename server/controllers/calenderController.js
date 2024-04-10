const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const axios = require("axios");

const oAuth2Client = new OAuth2(
  "49494450157-past37o3hghtbn0vd7mn220ub5u975ef.apps.googleusercontent.com",
  "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",
  "http://localhost:3000/auth/google/callback"
);

oAuth2Client.setCredentials({
  access_token:
  "ya29.a0Ad52N39O7YTV2QnDUbI3hN9t_Sf_TPXOkb0Wzu-TbsR9gyPYCamzkMa0UkOT7xeK8WLdlanKhSlhpXu_oOHkI9RGCCMs2M9SM_nMjch2hPIIAJ1EeYJMthiA79FQqvIAQlBkRSvBC2waVCP_kDv90tE_ZG4xAegLplGYaCgYKAe8SARASFQHGX2Mi9sP8FgfhQ7uW3wZd4ZUYRA0171"
,
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

const addevent = async (req, res) => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  // await createCalendar()
  // const calendarsMy = await getCalendarList();

  const events = await calendar.events.list({
    calendarId: "c17bb61364a8fff468066de3a7b884a8cbe83e61ad9b47cf633f34b4d01d1297@group.calendar.google.com",
    singleEvents: true,
    orderBy: "startTime",
  });
  //prevent readding same event if booking_id is same
  if (events.data.items.find((event) => event.booking_id === req.body.event.booking_id)) {
    return res.status(400).json({
      message: "event already exists",
      events
    });
  }

  const resp = await calendar.events.insert({
    calendarId: "c17bb61364a8fff468066de3a7b884a8cbe83e61ad9b47cf633f34b4d01d1297@group.calendar.google.com",
    resource: req.body.event,
    events
  });

  res.status(200).json({
    message: "event added",
    events
  });
};

module.exports = { addevent };
