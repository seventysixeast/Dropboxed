const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/Users');
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



