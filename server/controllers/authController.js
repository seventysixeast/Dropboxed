const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const User = require("../models/Users");
const { generateAccessToken } = require("../utils/jwtUtils");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const axios = require("axios");
const BusinessClients = require("../models/BusinessClients");
const clientController = require("../controllers/clientController");
const sequelize = require('../config/sequelize');
const { SEND_VERIFICATION_EMAIL, SEND_VERIFICATION_CLIENT_EMAIL, SEND_OTP, WELCOME_EMAIL } = require("../helpers/emailTemplate");
const { sendEmail, generateVerificationToken } = require("../helpers/sendEmail");

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_CALLBACK
);

exports.verifyEmail = async (req, res) => {
  const { verificationToken } = req.body;
  try {
    const user = await User.findOne({ where: { verification_token: verificationToken } });
    if (!user) {
      throw new Error('Invalid verification token');
    }
    user.is_verified = true;
    user.verification_token = null;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Email verification failed" });
  }
};

exports.login = async (req, res) => {
  const { userName, password, subdomain } = req.body;
  let subdomain_id = "";
  let user_subdmain = "";

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
        .status(200)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Check if the user is active
    if (user.status == "inactive") {
      return res.status(200).json({ success: false, message: 'Your account is deactivated. Please contact support for assistance.' });
    }

    

    // Check if the user's roles are administrator (role_id = 1) and business owner (role_id = 5)
    if (user.role_id === 1 || user.role_id === 5) {
      // Verify if the user's subdomain matches the provided subdomain
      if (subdomain && user.subdomain !== subdomain) {
        return res
          .status(200)
          .json({ success: false, message: "Unauthorized access" });
      }
      user_subdmain = user.subdomain;
      subdomain_id = user.id;
    }

    // Check if the user's roles are photographer (role_id = 2) and client (role_id = 3)
    if (user.role_id === 2 || user.role_id === 3) {
      // Check if the client is connected to the provided subdomain
      const businessClient = await BusinessClients.findOne({
        where: { client_id: user.id },
      });
      if (!businessClient) {
        return res
          .status(200)
          .json({ success: false, message: "Unauthorized access" });
      }

      const businessOwner = await User.findByPk(businessClient.business_id);
      if (!businessOwner || businessOwner.subdomain !== subdomain) {
        return res
          .status(200)
          .json({ success: false, message: "Unauthorized access" });
      }
      subdomain_id = businessOwner.id;
      user_subdmain = businessOwner.subdomain;
    }

    const accessToken = generateAccessToken(user.id);
    const isFirstLogin = user.is_first_login;
    if (isFirstLogin) {
      // Send Welcome email
      var SEND_EMAIL = WELCOME_EMAIL();
      sendEmail(user.email, "Welcome to Studiio.au!", SEND_EMAIL);
      // Update the is_first_login flag
      user.is_first_login = false;
      await user.save();
    }
    // if user.role_id = 2 then find the subdomain with subdomain_id and the get the dropbox_refresh
    if (user.role_id === 2) {
      const businessOwner = await User.findByPk(subdomain_id);
      let dropboxRefresh = businessOwner.dropbox_refresh
      let dropboxAccess = businessOwner.dropbox_access

      return res.status(200).json({
        success: true,
        accessToken,
        user: {
          id: user.id,
          userName: user.name,
          email: user.email,
          profilePhoto: user.profile_photo,
          subdomain: user_subdmain,
          subdomain_id: subdomain_id,
          calendarSub: user.calendar_sub,
          role_id: user.role_id,
          dropbox_refresh: dropboxRefresh,
          dropbox_access: dropboxAccess,
          is_verified: user.is_verified,
          isFirstLogin: isFirstLogin
        },
        message: "Login successfull",
      });
    } else {

      // Return user information along with token
      return res.status(200).json({
        success: true,
        accessToken,
        user: {
          id: user.id,
          userName: user.name,
          email: user.email,
          profilePhoto: user.profile_photo,
          subdomain: user_subdmain,
          subdomain_id: subdomain_id,
          calendarSub: user.calendar_sub,
          role_id: user.role_id,
          dropbox_refresh: user.dropbox_refresh,
          dropbox_access: user.dropbox_access,
          is_verified: user.is_verified,
          isFirstLogin: isFirstLogin
        },
        message: "Login successfull",
      });
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.signup = async (req, res) => {
  const { studioName, email, password, country } = req.body;
  // return res.status(200).json({ success: false, message: 'Invalid email or password' });
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(200)
        .json({ success: false, message: "Email already exists" });
    }

    const existingDomain = await User.findOne({
      where: sequelize.where(sequelize.fn('LOWER', sequelize.col('subdomain')), studioName.toLowerCase())
    });
    if (existingDomain) {
      return res
        .status(200)
        .json({ success: false, message: "Studio name already in use. Please Use another name" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Create the user
    const newUser = await User.create({
      studioName,
      email,
      password: hashedPassword,
      country,
      role_id: 5,
      subdomain: studioName,
      account_email: email,
      verification_token: verificationToken,
      is_verified: false
    });

    // Send email notification
    var SEND_EMAIL = SEND_VERIFICATION_EMAIL(studioName, email, verificationToken);
    sendEmail(email, "Welcome to studiio.au!", SEND_EMAIL);

    res.status(200).json({
      success: true,
      message: "Registration successful. Please check your email for verification instructions.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error signing up: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

async function createCalendar(data) {
  oAuth2Client.setCredentials({
    access_token: data.access_token,
  });

  try {
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const calendarlist = await calendar.calendarList.list();
    const calendars = calendarlist.data.items;

    // [
    //   {
    //     kind: 'calendar#calendarListEntry',
    //     etag: '"1714650878651000"',
    //     id: 'en.indian#holiday@group.v.calendar.google.com',
    //     summary: 'Holidays in India',
    //     description: 'Holidays and Observances in India',
    //     timeZone: 'UTC',
    //     summaryOverride: 'Holidays in India',
    //     colorId: '8',
    //     backgroundColor: '#16a765',
    //     foregroundColor: '#000000',
    //     selected: true,
    //     accessRole: 'reader',
    //     defaultReminders: [],
    //     conferenceProperties: { allowedConferenceSolutionTypes: [Array] }
    //   },
    //   {
    //     kind: 'calendar#calendarListEntry',
    //     etag: '"1714650939960000"',
    //     id: '93ab43bbb1cc217a8693947d2eaf4e31bf1ecef3610d7d869fcc6a7e11f7db45@group.calendar.google.com',
    //     summary: 'dropboxed',
    //     timeZone: 'UTC',
    //     colorId: '4',
    //     backgroundColor: '#fa573c',
    //     foregroundColor: '#000000',
    //     selected: true,
    //     accessRole: 'owner',
    //     defaultReminders: [],
    //     conferenceProperties: { allowedConferenceSolutionTypes: [Array] }
    //   },
    //   {
    //     kind: 'calendar#calendarListEntry',
    //     etag: '"1714650984116000"',
    //     id: 'addressbook#contacts@group.v.calendar.google.com',
    //     summary: 'Birthdays',
    //     description: 'Displays birthdays, anniversaries, and other event dates of people in Google Contacts.',
    //     timeZone: 'UTC',
    //     summaryOverride: 'Birthdays',
    //     colorId: '13',
    //     backgroundColor: '#92e1c0',
    //     foregroundColor: '#000000',
    //     selected: true,
    //     accessRole: 'reader',
    //     defaultReminders: [],
    //     conferenceProperties: { allowedConferenceSolutionTypes: [Array] }
    //   },
    //   {
    //     kind: 'calendar#calendarListEntry',
    //     etag: '"1714650984917000"',
    //     id: 'rkumarsb22@gmail.com',
    //     summary: 'rkumarsb22@gmail.com',
    //     timeZone: 'UTC',
    //     colorId: '14',
    //     backgroundColor: '#9fe1e7',
    //     foregroundColor: '#000000',
    //     selected: true,
    //     accessRole: 'owner',
    //     defaultReminders: [ [Object] ],
    //     notificationSettings: { notifications: [Array] },
    //     primary: true,
    //     conferenceProperties: { allowedConferenceSolutionTypes: [Array] }
    //   }
    // ]


    // in calendars find items which has primary true

    const primaryCalendar = calendars.find((item) => item.primary);
    return primaryCalendar.id;

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
    const { name, email, phone, business_name, password, subdomain } = req.body;
    const profilePhoto = req.files && req.files.profile_photo;

    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ success: false, error: "Password is required" });
    }

    const subdomainUser = await User.findOne({
      where: { role_id: 5, subdomain },
    });

    if (!subdomainUser) {
      return res.status(400).json({ success: false, error: "Subdomain does not exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = generateVerificationToken();

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ success: false, error: "Already registered with this Email id." });
    }

    if (phone) {
      const existingPhone = await User.findOne({ where: { phone } });
      if (existingPhone) {
        return res.status(400).json({ success: false, error: "Phone number already exists" });
      }
    }

    let clientData = {
      name,
      email,
      phone: phone || "",
      business_name: business_name || "",
      role_id: 3,
      password: hashedPassword,
      verification_token: verificationToken,
      is_verified: false,
    };

    if (profilePhoto) {
      const uniqueImageName = `${Date.now()}_${profilePhoto.name}`;
      const fileUrl = `${process.cwd()}/public/clients/${uniqueImageName}`;

      await profilePhoto.mv(fileUrl);
      clientData.profile_photo = uniqueImageName;
    }

    const client = await User.create(clientData);

    await BusinessClients.create({
      business_id: subdomainUser.id,
      client_id: client.id,
      status: 1,
    });

    clientController.updateRedisCache(subdomainUser.id);

    const emailContent = SEND_VERIFICATION_CLIENT_EMAIL(name, email, verificationToken);
    sendEmail(email, "Welcome to studiio.au!", emailContent);

    res.status(200).json({
      success: true,
      message: "Client registered successfully. Please check your email for verification instructions.",
      data: client.id,
    });
  } catch (error) {
    console.error("Error registering client:", error);
    res.status(500).json({ success: false, error: "Failed to register client" });
  }
};

exports.verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // You may need to customize this part based on your user model
    const user = await User.findByPk(decodedToken.userId);
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    }

    let subdomain_id = "";

    // Check user's role
    if (user.role_id === 5) {
      subdomain_id = user.id; // Set subdomain_id to the user's id if role is 5 (business owner)
    } else if (user.role_id === 3) {
      // Find the business owner associated with the client
      const businessClient = await BusinessClients.findOne({
        where: { client_id: user.id },
      });
      if (businessClient) {
        const businessOwner = await User.findByPk(businessClient.business_id);
        if (businessOwner && businessOwner.role_id === 5) {
          subdomain_id = businessOwner.id;
          user.subdomain = businessOwner.subdomain;
        }
      }
    } else if (user.role_id === 2) {
      const businessClient = await BusinessClients.findOne({
        where: { client_id: user.id },
      });
      if (businessClient) {
        const businessOwner = await User.findByPk(businessClient.business_id);
        if (businessOwner && businessOwner.role_id === 5) {
          subdomain_id = businessOwner.id;
          user.subdomain = businessOwner.subdomain;
          user.dropbox_refresh = businessOwner.dropbox_refresh;
          user.dropbox_access = businessOwner.dropbox_access;
        }
      }
    }
    const isFirstLogin = user.is_first_login;
    if (isFirstLogin) {
      // Send Welcome email
      var SEND_EMAIL = WELCOME_EMAIL();
      sendEmail(user.email, "Welcome to Studiio.au!", SEND_EMAIL);
      // Update the is_first_login flag
      user.is_first_login = false;
      await user.save();
    }
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
        role_id: user.role_id,
        dropbox_refresh: user.dropbox_refresh,
        dropbox_access: user.dropbox_access,
        isFirstLogin: isFirstLogin
      },
      success: true,
      message: "Success",
    });
  } catch (error) {
    // Handle token verification errors
    console.error("Error verifying token: ", error);
    res
      .status(201)
      .json({ success: false, message: "Token verification failed" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    let email = req.body.email;
    let user = await User.findOne({
      where: { email: email },
      attributes: ['name']
    });

    if (user) {
      let code = Math.floor(100000 + Math.random() * 900000);
      await User.update(
        { otp: code },
        { where: { email: email } }
      );

      var OTPEmail = SEND_OTP(user.name, email, code);
      sendEmail(email, "Password Reset", OTPEmail);

      return res.status(200).json({
        success: true,
        message: "OTP sent. Please check your inbox or spam mail.",
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    let { email, password, otp } = req.body.user;
    let foundUser = await User.findOne({ where: { email: email } });
    if (foundUser) {
      if (foundUser.otp == otp) {
        var salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        foundUser.otp = otp;
        foundUser.password = password;
        let a = await foundUser.save();
        if (a) {
          res.status(200).json({
            success: true,
            message: "Password Reset Successfully",
          });
        } else {
          return res
            .status(404)
            .json({ error: "Something went wrong. Please try again later" });
        }
      } else {
        return res.send({
          msg: "Wrong OTP.",
          error: true,
        });
      }
    } else {
      return res.status(404).json({ error: "Email not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

exports.dropboxAuth = async (req, res) => {
  try {
    let { dropbox_refresh, dropbox_access, dropbox_id, id } = req.body;

    if (
      dropbox_refresh === undefined ||
      dropbox_access === undefined ||
      id === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    id = parseInt(id);

    const userExists = await User.findOne({ where: { id: id } });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.update(
      { dropbox_refresh, dropbox_access, dropbox_id },
      {
        where: { id: id },
      }
    );

    res.status(200).json({
      success: true,
      message: "Dropbox Auth Successfully",
    });
  } catch (error) {
    console.error("Error in dropboxAuth:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
   }
};
