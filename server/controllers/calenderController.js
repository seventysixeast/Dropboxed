// add google calendar event google apis node express
const express = require('express');
const router = express.Router();
//file is in public folder
const credentialsPath = "./client.json";
const bodyParser = require('body-parser');
const { google } = require('googleapis');
// Replace with your Client ID and Client Secret
const clientId = '49494450157-past37o3hghtbn0vd7mn220ub5u975ef.apps.googleusercontent.com';
const clientSecret = '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';
const app = express();

app.use(bodyParser.json());

const event = {
  "summary": "Event Title",
  "description": "Detailed description of the event", // Optional, longer description
  "start": {
    "dateTime": "2024-04-10T011:00:00-07:00", // Required, ISO 8601 datetime format
  },
  "end": {
    "dateTime": "2024-04-10T12:00:00-07:00", // Required, ISO 8601 datetime format
  },
  "location": "Event Location", // Optional, venue or location
}

async function addEventToCalendar(email, accessToken, event) {
  // Create Google Calendar API client
  const calendar = google.calendar({ version: 'v3' });
  
  // Set authentication credentials
  calendar.auth = new google.auth.OAuth2(clientId, clientSecret, accessToken);

  try {
    // Insert event to user's calendar
    await calendar.events.insert({
      auth: calendar.auth,
      calendarId: email, // Use user's email address as calendar ID
      resource: event,
    });
    console.log('Event added successfully!');
    return { message: 'Event added successfully!' };
  } catch (error) {
    console.error('Error adding event:', error);
    return { error: 'Failed to add event' };
  }
}

// const addevent = async (req, res) => {
//   const email = 'rkumarsb22@gmail.com';
//   const accessToken ="ya29.a0Ad52N3_gGqt34Qo4_yG8STFNoUTbc01TSd97mPDWnvDO2KiJRMoPtyXFpbFbQ4-Hl-edS7xXHFkrdaRidUDxSWNeFnerhcN59xJpFVBp90MDZ1_TpOmgS1TsN1lQ002Jp84pknImJ2X1srZEw5e1uGOnvqsK4EEwm0AaCgYKAZESARASFQHGX2Mi6ntt8YBqZR9B0xs-xFEKqg0170"
//   // const { accessToken } = req.body;

//   if (!email || !accessToken || !event) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const response = await addEventToCalendar(email, accessToken, event);
//     res.json(response);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const addevent = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'https://developers.google.com/oauthplayground'
    );

    const tokens = await oauth2Client.getToken(code);
    const accessToken = tokens.tokens.access_token;

    // Proceed with calling the Google Calendar API using accessToken
    // ... (use same logic as before for adding events)

    res.json({ accessToken, message: 'Access token retrieved successfully' });
  } catch (error) {
    console.error('Error exchanging code:', error);
    res.status(500).json({ error: 'Failed to exchange code' });
  }
};



module.exports = { addevent };
