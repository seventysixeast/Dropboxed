const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const User = require("../models/Users");
const { generateAccessToken } = require("../utils/jwtUtils");
const { SEND_EMAIL } = require("../helpers/emailTemplate");
const { sendEmail } = require("../helpers/sendEmail");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const axios = require("axios");

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_CALLBACK
);

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: {
          [Op.eq]: userName,
        },
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const accessToken = generateAccessToken(user.id);

    // Return user information along with token
    res.json({
      accessToken,
      user: {
        id: user.id,
        userName: user.name,
        email: user.email,
        profilePhoto: user.profile_photo,
        subdomain: user.subdomain,
        calendarSub: user.calendar_sub,
      },
    });
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

exports.signup = async (req, res) => {
  const { studioName, email, password, country } = req.body;
  console.log("req.body", req.body);
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Email already exists" });
    }

    const existingDomain = await User.findOne({
      where: { subdomain: studioName },
    });
    if (existingDomain) {
      return res
        .status(400)
        .json({ status: false, message: "Studio name already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      studioName,
      email,
      password: hashedPassword,
      country,
      role_id: 5,
      subdomain: studioName,
    });

    //SEND_EMAIL.replace('#studioName#', studioName);
    // Send email notification
    await sendEmail(email, "Welcome to Our App", SEND_EMAIL);

    res.status(201).json({
      status: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error signing up: ", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

async function createCalendar(data) {
  oAuth2Client.setCredentials({
    access_token: data.access_token,
  });

  try {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const calendarName = "dropboxed";
    const calendarlist = await calendar.calendarList.list();
    const userCalenders = calendarlist.data.items;

    if (userCalenders.some((calendar) => calendar.summary === calendarName)) {
      const calendarId = userCalenders.find(
        (calendar) => calendar.summary === calendarName
      ).id;
      return calendarId;
    }

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

exports.google = async (req, res) => {
  try {
    const { code, id } = req.body;
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const redirect_uri = "postmessage";
    const grant_type = "authorization_code";

    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
        scope:
          "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.readonly",
        access_type: "offline",
        prompt: "consent",
        include_granted_scopes: "true",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const tokens = response.data;
    let resp = await createCalendar(tokens);

    await User.update(
      {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        calendar_sub: 1,
        calendar_id: resp,
      },
      {
        where: { id },
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Token exchange error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
