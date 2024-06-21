const User = require('../models/Users');
const bcrypt = require('bcrypt');
const sizeOf = require("image-size");
const Jimp = require("jimp");
const fs = require("fs");

const getUser = async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: ['id', 'username', 'name', 'email', 'status', 'business_name', 'profile_photo', 'logo', 'account_email', 'account_name', 'account_number', 'bsb_number', 'abn_acn', 'country', 'address', 'website', 'phone', 'postal_code', 'city'],
      where: {
        id: req.body.id
      }
    });
    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
};

const updateUser = async (req, res) => {
  try {
    let userData = {
      username: req.body.username,
      name: req.body.name,
      status: req.body.status,
      business_name: req.body.business_name,
    };

    if (req.files && req.files.profile_photo && Object.keys(req.files).length) {
      let file = req.files.profile_photo;
      let sanitizedDate = new Date().toISOString().replace(/[^\w\s]/gi, ''); // Remove special characters from date
      let sanitizedFilename = `${sanitizedDate}_profile.jpg`; // Ensure unique filenames with .jpg extension

      let fileUrl = `${process.cwd()}/public/clients/` + sanitizedFilename;

      // Resize image using Jimp with quality set to 85 percent
      let image = await Jimp.read(file.data);
      image.quality(85); // Set quality to 85 percent
      let dimensions = sizeOf(file.data);
      let width = 400;
      let height = (dimensions.height * width) / dimensions.width;
      await image.resize(width, height).write(fileUrl);

      userData.profile_photo = sanitizedFilename;
    }

    // Similarly handle logo file upload

    if (req.files && req.files.logo && Object.keys(req.files).length) {
      let file = req.files.logo;
      let sanitizedDate = new Date().toISOString().replace(/[^\w\s]/gi, ''); // Remove special characters from date
      let sanitizedFilename = `${sanitizedDate}_logo.jpg`; // Ensure unique filenames with .jpg extension

      let fileUrl = `${process.cwd()}/public/clients/` + sanitizedFilename;

      // Resize image using Jimp with quality set to 85 percent
      let image = await Jimp.read(file.data);
      image.quality(85); // Set quality to 85 percent
      let dimensions = sizeOf(file.data);
      let width = 400;
      let height = (dimensions.height * width) / dimensions.width;
      await image.resize(width, height).write(fileUrl);

      userData.logo = sanitizedFilename;
    }


    let user = await User.update(userData, {
      where: {
        id: req.body.id
      }
    });

    res.status(200).json({
      success: true,
      message: "Changes updated successfully",
      data: user
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};



const changeBankingDetails = async (req, res) => {
  const { id, account_email, account_name, account_number, bsb_number, abn_acn, country, address, city, postal_code, website, phone } = req.body;
  let data = { account_email: account_email, account_name: account_name, account_number: account_number, bsb_number: bsb_number, abn_acn: abn_acn, country: country, address: address, city: city, postal_code: postal_code, website: website, phone: phone };
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    let updatedUser = await user.update(data);

    return res.status(200).json({
      success: true,
      message: 'Banking details updated successfully.',
      updatedUser: updatedUser
    });
  } catch (error) {
    console.error('Error changing banking details:', error);
    return res.status(500).json({ error: 'Failed to update banking details.' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id, old_password, new_password, confirm_password } = req.body;
    if (new_password !== confirm_password) {
      return res.status(400).json({ error: 'New passwords do not match.' });
    }

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isAuthenticated = await bcrypt.compare(old_password, user.password);
    if (!isAuthenticated) {
      return res.status(400).json({ error: 'Incorrect old password.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);
    await user.update({ password: hashedPassword });
    return res.status(200).json({
      success: true,
      message: 'Password updated successfully.'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ error: 'Failed to update password.' });
  }
};

module.exports = { getUser, updateUser, changeBankingDetails, changePassword };