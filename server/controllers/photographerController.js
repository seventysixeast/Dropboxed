const User = require('../models/Users');
const bcrypt = require('bcrypt');

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
    let password = '123456';
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
      await photographer.update(photographerData);
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
      // Create the photographer
      photographer = await User.create(photographerData);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add/update photographer" });
  }
};

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