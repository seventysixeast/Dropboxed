const User = require('../models/Users');
const redis = require('ioredis');
const redisClient = new redis();

const updateRedisCache = async () => {
  try {
    const clients = await User.findAll({
      where: { role_id: 3 },
      order: [['created', 'DESC']]
    });
    await redisClient.set('clients', JSON.stringify(clients), 'EX', 3600);
    console.log('Redis cache updated successfully.');
  } catch (err) {
    console.error('Error updating Redis cache:', err);
  }
}

const getAllClients = async (req, res) => {
  try {
    let clients = await redisClient.get('clients');
    if (!clients) {
      clients = await User.findAll({
        where: { 
          role_id: 3,
          subdomain_id: req.body.subdomainId
        },
        order: [['created', 'DESC']]
      });
      await redisClient.set('clients', JSON.stringify(clients), 'EX', 3600);
    } else {
      clients = JSON.parse(clients);
    }
    res.status(200).json({ success: true, data: clients });
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
      client = await User.create(clientData);
    }
    // Update Redis cache
    updateRedisCache();
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
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }

    // Check if the client has been deactivated for at least 30 days
    const deactivatedAt = new Date(client.deactivated_at);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    if (deactivatedAt && deactivatedAt > thirtyDaysAgo) {
      return res.status(400).json({ success: false, message: "Client cannot be deleted yet" });
    }

    await User.destroy({ where: { id: clientId } });
    // Update Redis cache
    updateRedisCache();
    res.status(200).json({ success: true, message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete client" });
  }
};

const activeInactiveClient = async (req, res) => {
  try {
    const clientId = req.body.id;
    const clientStatus = req.body.status;

    let updateFields = { status: clientStatus };
    if (clientStatus === 'Inactive') {
      updateFields.deactivated_at = new Date(); // Set deactivation date
    }

    await User.update(updateFields, { where: { id: clientId } });

    const updatedClient = await User.findByPk(clientId);
    if (!updatedClient) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }
    // Update Redis cache
    updateRedisCache();
    res.status(200).json({
      success: true,
      message: "Client status updated.",
      data: updatedClient
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update client status" });
  }
};

module.exports = { updateRedisCache, getAllClients, createClient, getClient, deleteClient, activeInactiveClient };
