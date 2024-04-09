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
  "ya29.a0Ad52N3_GLWaKQYS1ZOSTTLsbW8qimfAbM7QPcYw6-saVutcjE7iGkLdD18MnZ5dnSJSXNrd5Hy54r6QGC-PM7xrK4jl03TUtiylRTYP-lJxKoMMuR1SbiASw4j6ZDbwjWgfxZaUpKDwUFOeOhyAwxM-6QtrTG-zAQQaCgYKAaQSARASFQHGX2Mig0qCF4_4Zn70D9nRy5QAdQ0169",
});

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.readonly",
];
const tokenEndpoint = 'https://oauth2.googleapis.com/token';
const authorizationCode = "4/0AeaYSHBwjSq5-UPOC2M4_piiMi273mhISRZewsb7ESik4n-OxvN3aKQwgiApS4IymwJAXQ";

const tokenRequestBody = {
  code: authorizationCode,
  client_id: "49494450157-past37o3hghtbn0vd7mn220ub5u975ef.apps.googleusercontent.com",
  client_secret: "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",
  redirect_uri: "http://localhost:3000/auth/google/callback",
  grant_type: 'authorization_code'
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
    console.error('Error exchanging authorization code for tokens:', error.response);
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

const addevent = async (req, res) => {
  try {
    const tokens = await getTokens();
    console.log(tokens);
    res.status(200).json({
    message: "event added",
    tokens
  });
  } catch (error) {
    console.error('Error:', error);
  }
  // const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  // const eventData = {
  //   summary: "Test Event",
  //   location: "Test Location",
  //   description: "This is a test event for testing purposes.",
  //   start: {
  //     dateTime: "2024-04-09T10:00:00+05:30", // IST time
  //     timeZone: "Asia/Kolkata", // Indian Standard Time
  //   },
  //   end: {
  //     dateTime: "2024-04-09T12:00:00+05:30", // IST time
  //     timeZone: "Asia/Kolkata", // Indian Standard Time
  //   },
  // };

  // await calendar.events.insert({ calendarId: "primary", resource: eventData });

  // res.status(200).json({
  //   message: "event added",
  // });
};

module.exports = { addevent };
