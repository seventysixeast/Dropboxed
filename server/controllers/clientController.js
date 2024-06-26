const User = require("../models/Users");
const BusinessClients = require("../models/BusinessClients");
const Collections = require("../models/Collections");
const bcrypt = require('bcrypt');
const { WELCOME_CLIENT_EMAIL } = require('../helpers/emailTemplate');
const { sendEmail } = require("../helpers/sendEmail");
const sizeOf = require("image-size");
const Jimp = require("jimp");
const fs = require("fs");

const updateRedisCache = async (subdomain_id) => {
  try {
    const clients = await BusinessClients.findAll({
      where: {
        business_id: subdomain_id,
      },
      attributes: ["client_id"],
    });
    const clientIds = clients.map((client) => client.client_id);
    const clientsData = await User.findAll({
      where: {
        role_id: 3,
        id: clientIds,
      },
      order: [["created", "DESC"]],
    });
    await redisClient.set(
      "clientsData",
      JSON.stringify(clientsData),
      "EX",
      3600
    );
  } catch (err) {
    console.error("Error updating Redis cache:", err);
  }
};

const getAllClients = async (req, res) => {
  try {
    const checkUser = await User.findOne({ where: { id: req.body.subdomainId } });
    if (checkUser.role_id === 2) {
      const clients = await Collections.findAll({
        where: {
          photographer_ids: req.body.subdomainId,
          status: 'Active'
        },
        attributes: ['client_id']
      });
      const clientIdsSet = new Set(clients.map(client => client.client_id));
      const clientIds = [...clientIdsSet];
      const clientsData = await User.findAll({
        where: {
          role_id: 3,
          id: clientIds,
          status: 'Active'
        },
        order: [["created", "DESC"]]
      });
      res.status(200).json({ success: true, data: clientsData });
    } else {
      const clients = await BusinessClients.findAll({
        where: {
          business_id: req.body.subdomainId,
        },
        attributes: ["client_id"]
      });
      const clientIds = clients.map((client) => client.client_id);
      const clientsData = await User.findAll({
        where: {
          role_id: 3,
          id: clientIds,
          status: 'Active'
        },
        order: [["created", "DESC"]]
      });
      res.status(200).json({ success: true, data: clientsData });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to list clients" });
  }
};

const getClientPhotographers = async (req, res) => {
  try {
    const clients = await BusinessClients.findAll({
      where: {
        business_id: req.body.subdomain_id,
      },
      attributes: ["client_id"],
    });

    let clientIds = clients.map((client) => client.client_id);
    clientIds.push(parseInt(req.body.subdomain_id));
    const clientdata = await User.findAll({
      where: {
        id: clientIds,
      },
      attributes: ["id", "name", "role_id", "profile_photo", "status"],
      order: [["created", "DESC"]],
    });
    res.status(200).json({ success: true, data: clientdata });
  } catch (error) {
    res.status(500).json({ error: "Failed to get users" });
  }
};

const createClient = async (req, res) => {
  try {
    // Generate random password
    let password = Math.random().toString(36).slice(-8);
    let hashedPassword = await bcrypt.hash(password, 10);
    let clientData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      business_name: req.body.business_name,
      role_id: req.body.role_id,
      password: hashedPassword,
      is_verified: true,
      is_first_login: false
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

      clientData.profile_photo = sanitizedFilename;
    }

    let client;
    if (req.body.id) {
      client = await User.findOne({ where: { id: req.body.id } });
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      await client.update(clientData);
    } else {
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
      client = await User.create(clientData);

      // Handle business clients
      await BusinessClients.create({
        business_id: req.body.subdomainId,
        client_id: client.id,
        status: 1
      });

      // Fetch user data for email notification
      const user = await User.findOne({
        where: { id: req.body.subdomainId },
        attributes: ['subdomain', 'name', 'email', 'logo']
      });

      // Send email notification
      var SEND_EMAIL = WELCOME_CLIENT_EMAIL(user.subdomain.charAt(0).toUpperCase() + user.subdomain.slice(1), user.email, user.logo, client.name, client.email, password);
      sendEmail(req.body.email, `Welcome to ${user.subdomain.charAt(0).toUpperCase() + user.subdomain.slice(1)}!`, SEND_EMAIL);
    }

    res.status(200).json({
      success: true,
      message: req.body.id
        ? "Client updated successfully"
        : "Client added successfully. Password sent to his email.",
      data: client
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add/update client" });
  }
};


const getClient = async (req, res) => {
  try {
    const clientData = await User.findOne({ where: { id: req.body.id } });
    res.status(200).json({ success: true, data: clientData });
  } catch (error) {
    res.status(500).json({ error: "Failed to data of client" });
  }
};

const userStatusCheck = async (req, res) => {
  try {
    // attributes: ['id', 'status']
    const client = await User.findOne({ where: { id: req.body.id }, attributes: ['id', 'status'] });
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ error: "Failed to data of client" });
  }
};

const deleteClient = async (req, res) => {
  try {
    const clientId = req.body.id;
    const client = await User.findByPk(clientId);

    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    await User.update(
      { status: "Deleted", deleted_at: new Date() },
      { where: { id: clientId } }
    );

    // await updateRedisCache(req.body.subdomainId);

    res
      .status(200)
      .json({
        success: true,
        message:
          "Action successful. Record will be removed permanently after 30 days."
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to update client status" });
  }
};

const activeInactiveClient = async (req, res) => {
  try {
    const clientId = req.body.id;
    const clientStatus = req.body.status;
    let updateFields = { status: clientStatus };

    await User.update(updateFields, { where: { id: clientId } });
    const updatedClient = await User.findByPk(clientId);

    if (!updatedClient) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    // await updateRedisCache(req.body.subdomainId);

    res.status(200).json({
      success: true,
      message: "Client status updated.",
      data: updatedClient,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update client status" });
  }
};

const getAllPhotographers = async (req, res) => {
  try {
    const photographers = await BusinessClients.findAll({
      where: {
        business_id: req.body.subdomainId,
      },
      attributes: ["client_id"],
    });
    const photographerIds = photographers.map(
      (photographer) => photographer.client_id
    );
    let photographersData = await User.findAll({
      where: {
        role_id: 2,
        id: photographerIds,
        status: 'Active'
      },
    });
    res.status(200).json({ success: true, data: photographersData });
  } catch (error) {
    res.status(500).json({ error: "Failed to list clients" });
  }
};

module.exports = {
  updateRedisCache,
  getAllClients,
  createClient,
  getClient,
  userStatusCheck,
  deleteClient,
  activeInactiveClient,
  getAllPhotographers,
  getClientPhotographers,
};
