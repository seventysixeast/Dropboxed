const User = require('../models/Users');
const BusinessClients = require('../models/BusinessClients');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const getAllPhotographers = async (req, res) => {
  try {
    let photographers = await User.findAll({
      where: {
        role_id: 2
      },
      order: [['created', 'DESC']]
    });
    res.status(200).json({ success: true, data: photographers });
  } catch (error) {
    res.status(500).json({ error: "Failed to list clients" });
  }
};

const createPhotographer = async (req, res) => {
  try {
    let imageName = req.files && req.files.profile_photo.name;
    // Generate random password
    let password = Math.random().toString(36).slice(-8);
    let hashedPassword = await bcrypt.hash(password, 10);
    let photographerData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      business_name: req.body.business_name,
      role_id: req.body.role_id,
      profile_photo: imageName || req.body.profile_photo,
      password: hashedPassword
    };
    if (req.files && Object.keys(req.files).length) {
      let file = req.files.profile_photo;
      let fileUrl = `${process.cwd()}/public/clients/` + req.files.profile_photo.name;
      file.mv(fileUrl, async function (err) {
        if (err) {
          console.log("in image move error...", fileUrl, err);
        }
      });
    }
    let photographer;
    if (req.body.id) {
      photographer = await User.findOne({ where: { id: req.body.id } });
      if (!photographer) {
        return res.status(404).json({ error: 'Photographer not found' });
      }
      // Update photographer
      await photographer.update(photographerData);
      res.status(200).json({
        success: true,
        message: "Photographer updated successfully"
      });
    } else {
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
      // Create photographer
      photographer = await User.create(photographerData);

      // Link the photographer to the subdomain
      await BusinessClients.create({
        business_id: req.body.subdomainId,
        client_id: photographer.id,
        status: 1
      });

      // Send password to the user's email
      sendPasswordByEmail(req.body.email, password);
      res.status(200).json({
        success: true,
        message: "Photographer added successfully. Password sent to his email."
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add/update photographer" });
  }
};

// Function to send password to user's email
function sendPasswordByEmail(email, password) {
  console.log("email",email);
  console.log("password",password);
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_password'
    }
  });

  let mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Your New Password',
    text: `Your new password is: ${password}. Please change it after logging in.`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const getPhotographer = async (req, res) => {
  try {
    const photographerData = await User.findOne({ where: { id: req.body.id } });
    res.status(200).json({ success: true, data: photographerData });
  } catch (error) {
    res.status(500).json({ error: "Failed to data of photographer" });
  }
};

const deletePhotographer = async (req, res) => {
  try {
    const photographerId = req.body.id;
    const photographer = await User.findByPk(photographerId);
    if (!photographer) {
      return res.status(404).json({ success: false, message: "Photographer not found" });
    }
    await User.update({ status: 'Deleted', deleted_at: new Date() }, { where: { id: photographerId } });
    res.status(200).json({ success: true, message: "Action successful. Record will be removed permanently after 30 days." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update photographer status" });
  }
};

module.exports = { getAllPhotographers, createPhotographer, getPhotographer, deletePhotographer };