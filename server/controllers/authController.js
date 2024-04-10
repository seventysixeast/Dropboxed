const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/Users');
const BusinessClients = require('../models/BusinessClients');
const { generateAccessToken } = require('../utils/jwtUtils');
const { SEND_EMAIL } = require('../helpers/emailTemplate');
const { sendEmail } = require('../helpers/sendEmail');

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: {
          [Op.eq]: userName
        }
      }
    });

    if (!user) {
      return res.status(401).json({ status: false, message: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ status: false, message: 'Invalid email or password' });
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
        subdomain: user.subdomain
      }
    });
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({status: false, message: 'Internal Server Error' });
  }
};


exports.signup = async (req, res) => {
  const { studioName, email, password, country } = req.body;
  console.log("req.body", req.body);
  return res.status(401).json({ status: false, message: 'Invalid email or password' });
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: false, message: 'Email already exists' });
    }

    const existingDomain = await User.findOne({ where: { subdomain: studioName } });
    if (existingDomain) {
      return res.status(400).json({ status: false, message: 'Studio name already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      studioName,
      email,
      password: hashedPassword,
      country,
      role_id: 5, // Business role id 5
      subdomain: studioName // Save studioName in subdomain field
    });

    //SEND_EMAIL.replace('#studioName#', studioName);
    // Send email notification
    await sendEmail(email, 'Welcome to Our App', SEND_EMAIL);

    res.status(201).json({ status: true, message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error signing up: ', error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};

exports.google =(req, res) => {
  
  const { code } = req.body;
  console.log(code);
  const client_id = "49494450157-past37o3hghtbn0vd7mn220ub5u975ef.apps.googleusercontent.com"
  const client_secret = "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"
  const redirect_uri = 'postmessage'
  const grant_type = "authorization_code";
  fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type,
      scope: "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly",
      access_type: "offline",
    }),
  })
  .then(response => response.json())
  .then(tokens => {
    // Send the tokens back to the frontend, or store them securely and create a session
    res.json(tokens);
  })
  .catch(error => {
    // Handle errors in the token exchange
    console.error('Token exchange error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
};

exports.clientSignup = async (req, res) => {
  try {
    let imageName = req.files && req.files.profile_photo.name;

    let clientData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      business_name: req.body.business_name || '',
      role_id: 3,
      profile_photo: ''
    };

    // Check if a subdomain exists for the business
    const subdomainUser = await User.findOne({ where: { role_id: 5, subdomain: req.body.subdomain } });
    if (!subdomainUser) {
      return res.status(400).json({ error: 'Subdomain does not exist' });
    }

    if (req.files && Object.keys(req.files).length) {
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
    }

    if (req.body.email !== '') {
      const existingEmail = await User.findOne({ where: { email: req.body.email } });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }
    if (req.body.phone !== '') {
      const existingPhone = await User.findOne({ where: { phone: req.body.phone } });
      if (existingPhone) {
        return res.status(400).json({ error: 'Phone number already exists' });
      }
    }

    // Create the client
    const client = await User.create(clientData);

    // Link the client to the subdomain
    await BusinessClients.create({
      business_id: subdomainUser.id,
      client_id: client.id,
      status: 1
    });

    res.status(200).json({
      success: true,
      message: "Client registered successfully",
      data: client
    });
  } catch (error) {
    console.log("Error:", error);
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
          return res.status(401).json({ status: false, message: 'User not found' });
      }
      // Return user information along with token
      res.status(200).json({
          accessToken: token,
          user: {
              id: user.id,
              userName: user.name,
              email: user.email,
              profilePhoto: user.profile_photo,
              subdomain: user.subdomain
          }
      });
  } catch (error) {
      // Handle token verification errors
      console.error('Error verifying token: ', error);
      res.status(400).json({ status: false, message: 'Token verification failed' });
  }
};