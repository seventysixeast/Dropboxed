const User = require('../models/Users');

const getAllClients = async (req, res) => {
  try {
    const clients = await User.findAll({
      where: {
        role_id: 3
      },
      order: [
        ['created', 'DESC']
      ]
    });
    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ error: "Failed to list clients" });
  }
};


const createClient = async (req, res) => {
  try {
    let imageName = req.files.profile_photo.name;
    let clientData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      role_id: req.body.role_id,
      profile_photo: imageName
    };

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.profile_photo;
    let fileUrl = `${process.cwd()}/public/clients/` + req.files.profile_photo.name;

    file.mv(fileUrl, async function (err) {
      if (err) {
        console.log("in image move error...", fileUrl, err);
      }
    });

    let client;
    if (req.body.id) {
      client = await User.findOne({ where: { id: req.body.id } });
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      await client.update(clientData);
    } else {
      const existingEmail = await User.findOne({ where: { email: req.body.email } });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const existingPhone = await User.findOne({ where: { phone: req.body.phone } });
      if (existingPhone) {
        return res.status(400).json({ error: 'Phone number already exists' });
      }
      client = await User.create(clientData);
    }
    res.status(201).json({
      success: true,
      message: req.body.id ? "Client updated successfully" : "Client created successfully",
      data: client
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add/update client" });
  }
};

const getClient = async (req, res) => {
  console.log("req.body", req.id);
  console.log("req.body.id", req.body.id);
  try {
    const clientData = await User.findOne({ where: { id: req.body.id } });
    res.status(200).json({ success: true, data: clientData });
  } catch (error) {
    res.status(500).json({ error: "Failed to data of client" });
  }
};

const deleteClient = async (req, res) => {
  try {
    const clientId = req.body.id;
    console.log("clientId", clientId);
    const deleted = await User.destroy({
      where: { id: clientId }
    });
    if (deleted) {
      res.status(200).json({ success: true, message: "Client deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Client not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete client" });
  }
};

module.exports = { createClient, getClient, deleteClient, getAllClients };