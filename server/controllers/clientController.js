const User = require('../models/Users');
const BusinessClients = require('../models/BusinessClients');
const redis = require('ioredis');
const redisClient = new redis();

const updateRedisCache = async (subdomain_id) => {
  console.log("subdomain_id", subdomain_id);
  try {
    const clients = await BusinessClients.findAll({
      where: {
        business_id: subdomain_id
      },
      attributes: ['client_id']
    });
    const clientIds = clients.map(client => client.client_id);
    const clientsData = await User.findAll({
      where: {
        role_id: 3,
        id: clientIds
      },
      order: [['created', 'DESC']]
    });
    await redisClient.set('clientsData', JSON.stringify(clientsData), 'EX', 3600);
  } catch (err) {
    console.error('Error updating Redis cache:', err);
  }
}

const getAllClients = async (req, res) => {
  try {
    let clientsData = await redisClient.get('clientsData');
    if (!clientsData) {
      const clients = await BusinessClients.findAll({
        where: {
          business_id: req.body.subdomainId
        },
        attributes: ['client_id']
      });
      const clientIds = clients.map(client => client.client_id);
      clientsData = await User.findAll({
        where: {
          role_id: 3,
          id: clientIds
        },
        order: [['created', 'DESC']]
      });
      await redisClient.set('clientsData', JSON.stringify(clientsData), 'EX', 3600);
    } else {
      clientsData = JSON.parse(clientsData);
    }
    res.status(200).json({ success: true, data: clientsData });
  } catch (error) {
    res.status(500).json({ error: "Failed to list clients" });
  }
};

const createClient = async (req, res) => {
  try {
    let imageName = req.files && req.files.profile_photo.name;
    let clientData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      business_name: req.body.business_name,
      role_id: req.body.role_id,
      profile_photo: imageName || req.body.profile_photo
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

    let client;
    if (req.body.id) {
      client = await User.findOne({ where: { id: req.body.id } });
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      await client.update(clientData);
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
      // Create the client
      client = await User.create(clientData);
      // Link the client to the subdomain
      await BusinessClients.create({
        business_id: req.body.subdomainId,
        client_id: client.id,
        status: 1,
      });
    }
    // Update Redis cache
    await updateRedisCache(req.body.subdomainId);
    res.status(200).json({
      success: true,
      message: req.body.id ? "Client updated successfully" : "Client created successfully",
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

const deleteClient = async (req, res) => {
  try {
    const clientId = req.body.id;
    const client = await User.findByPk(clientId);
    
    // Check if the client exists
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }

    // Update the status to 'Deleted' and set the deletedAt date
    await User.update({ status: 'Deleted', deleted_at: new Date() }, { where: { id: clientId } });

    // Update Redis cache
    await updateRedisCache(req.body.subdomainId);
    
    res.status(200).json({ success: true, message: "Action successful. Record will be removed permanently after 30 days." });
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
      return res.status(404).json({ success: false, message: "Client not found" });
    }
    
    // Update Redis cache
    await updateRedisCache(req.body.subdomainId);
    
    res.status(200).json({
      success: true,
      message: "Client status updated.",
      data: updatedClient
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update client status" });
  }
};

const getAllPhotographers = async (req, res) => {
  try {
    const photographers = await BusinessClients.findAll({
      where: {
        business_id: req.body.subdomainId
      },
      attributes: ['client_id']
    });
    const photographerIds = photographers.map(photographer => photographer.client_id);
    let photographersData = await User.findAll({
      where: {
        role_id: 2,
        id: photographerIds
      }
    });
    res.status(200).json({ success: true, data: photographersData });
  } catch (error) {
    res.status(500).json({ error: "Failed to list clients" });
  }
};

module.exports = { updateRedisCache, getAllClients, createClient, getClient, deleteClient, activeInactiveClient, getAllPhotographers };
