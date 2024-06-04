const User = require('../models/Users');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
  try {
    const userData = await User.findOne( {
      attributes: ['id', 'username', 'name', 'email', 'status', 'business_name', 'profile_photo', 'logo', 'account_email', 'account_name', 'account_number', 'bsb_number', 'abn_acn', 'country', 'address', 'website', 'phone'],
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
      let fileUrl = `${process.cwd()}/public/clients/` + req.files.profile_photo.name;
      file.mv(fileUrl, async function (err) {
        if (err) {
          console.log("in image move error...", fileUrl, err);
        }
      });
      userData.profile_photo = req.files.profile_photo.name;
    }
    if (req.files && req.files.logo && Object.keys(req.files).length) {
      let file = req.files.logo;
      let fileUrl = `${process.cwd()}/public/clients/` + req.files.logo.name;
      file.mv(fileUrl, async function (err) {
        if (err) {
          console.log("in image move error...", fileUrl, err);
        }
      });
      userData.logo = req.files.logo.name;
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
    res.status(500).json({ error: "Failed to update user" });
  }
};

const changeBankingDetails = async (req, res) => {
  console.log(req.body);
  try {
    const { id, account_email, account_name, account_number, bsb_number, abn_acn, country, address, website, phone } = req.body;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    await user.update({ account_email, account_name, account_number, bsb_number, abn_acn, country, address, website, phone });

    return res.status(200).json({
      success: true,
      message: 'Banking details updated successfully.'
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