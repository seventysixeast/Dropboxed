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
const BusinessClients = require("../models/BusinessClients");

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_CALLBACK
);

exports.login = async (req, res) => {
  const { userName, password, subdomain } = req.body;
  let subdomain_id = '';
  try {
    const user = await User.findOne({
      where: {
        email: {
          [Op.eq]: userName,
        },
      },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check if the user's role is business owner (role_id = 5)
    if (user.role_id === 5) {
      // Verify if the user's subdomain matches the provided subdomain
      if (subdomain && user.subdomain !== subdomain) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
      }
      subdomain_id = user.id;
    }

    // Check if the user's role is client (role_id = 3)
    if (user.role_id === 3) {
      // Check if the client is connected to the provided subdomain
      const businessClient = await BusinessClients.findOne({ where: { client_id: user.id } });
      if (!businessClient) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
      }

      const businessOwner = await User.findByPk(businessClient.business_id);
      if (!businessOwner || businessOwner.subdomain !== subdomain) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
      }
      subdomain_id = businessOwner.id;
    }

    // Generate JWT token
    const accessToken = generateAccessToken(user.id);

    // Return user information along with token
    return res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user.id,
        userName: user.name,
        email: user.email,
        profilePhoto: user.profile_photo,
        subdomain: user.subdomain,
        subdomain_id: subdomain_id,
        calendarSub: user.calendar_sub,
        role_id: user.role_id
      },
      message: "Login successfull"
    });
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.signup = async (req, res) => {
  const { studioName, email, password, country } = req.body;
  console.log("req.body", req.body);
  // return res.status(401).json({ success: false, message: 'Invalid email or password' });
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const existingDomain = await User.findOne({
      where: { subdomain: studioName },
    });
    if (existingDomain) {
      return res.status(400).json({ success: false, message: 'Studio name already exists' });
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
      account_email: email
    });

    //SEND_EMAIL.replace('#studioName#', studioName);
    // Send email notification
    await sendEmail(email, "Welcome to Our App", SEND_EMAIL);

    res.status(201).json({ success: true, message: 'Registration successfull', user: newUser });
  } catch (error) {
    console.error('Error signing up: ', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
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

exports.clientSignup = async (req, res) => {
  try {
    let imageName = req.files && req.files.profile_photo.name;

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let clientData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || "",
      business_name: req.body.business_name || "",
      role_id: 3,
      //profile_photo: '',
      password: hashedPassword
    };

    // Check if a subdomain exists for the business
    const subdomainUser = await User.findOne({
      where: { role_id: 5, subdomain: req.body.subdomain },
    });
    if (!subdomainUser) {
      return res.status(400).json({ error: "Subdomain does not exist" });
    }

    /*if (req.files && Object.keys(req.files).length) {
      let file = req.files.profile_photo;

      // Generate a unique image name using timestamp
      const uniqueImageName = `${Date.now()}_${file.name}`;

      let fileUrl = `${process.cwd()}/public/clients/` + uniqueImageName;

      file.mv(fileUrl, async function (err) {
        if (err) {
          console.log("Error moving image:", fileUrl, err);
        }
      });

      // Assign the unique image name to clientData
      clientData.profile_photo = uniqueImageName;
    }*/

    if (req.body.email !== "") {
      const existingEmail = await User.findOne({
        where: { email: req.body.email },
      });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }
    if (req.body.phone !== "") {
      const existingPhone = await User.findOne({
        where: { phone: req.body.phone },
      });
      if (existingPhone) {
        return res.status(400).json({ error: "Phone number already exists" });
      }
    }

    // Create the client
    const client = await User.create(clientData);

    // Link the client to the subdomain
    await BusinessClients.create({
      business_id: subdomainUser.id,
      client_id: client.id,
      status: 1,
    });

    res.status(200).json({
      success: true,
      message: "Client registered successfully",
      data: client,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register client" });
  }
};

exports.verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    // Here you would implement your token verification logic
    // For example, you could use JWT verify method
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // If verification is successful, you can return some data
    // You may need to customize this part based on your user model
    const user = await User.findByPk(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    // Return user information along with token
    res.status(200).json({
      accessToken: token,
      user: {
        id: user.id,
        userName: user.name,
        email: user.email,
        profilePhoto: user.profile_photo,
        subdomain: user.subdomain,
      },
      success: true,
      message: "Success"
    });
  } catch (error) {
    // Handle token verification errors
    console.error("Error verifying token: ", error);
    res
      .status(400)
      .json({ success: false, message: "Token verification failed" });
  }
};

exports.verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    // Here you would implement your token verification logic
    // For example, you could use JWT verify method
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // If verification is successful, you can return some data
    // You may need to customize this part based on your user model
    const user = await User.findByPk(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    let subdomain_id = ''; // Initialize subdomain_id

    // Check user's role
    if (user.role_id === 5) {
      subdomain_id = user.id; // Set subdomain_id to the user's id if role is 5 (business owner)
    } else if (user.role_id === 3) {
      // Find the business owner associated with the client
      const businessClient = await BusinessClients.findOne({ where: { client_id: user.id } });
      if (businessClient) {
        const businessOwner = await User.findByPk(businessClient.business_id);
        if (businessOwner && businessOwner.role_id === 5) {
          subdomain_id = businessOwner.id; // Set subdomain_id to the business owner's id if role is 3 (client)
          user.subdomain = businessOwner.subdomain;
        }
      }
    }

    // Return user information along with token
    res.status(200).json({
      accessToken: token,
      user: {
        id: user.id,
        userName: user.name,
        email: user.email,
        profilePhoto: user.profile_photo,
        subdomain: user.subdomain,
        subdomain_id: subdomain_id,
        calendarSub: user.calendar_sub,
        role_id: user.role_id
      },
      success: true,
      message: "Success"
    });
  } catch (error) {
    // Handle token verification errors
    console.error("Error verifying token: ", error);
    res.status(400).json({ success: false, message: "Token verification failed" });
  }
};

