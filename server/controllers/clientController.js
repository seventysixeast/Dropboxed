const User = require('../models/Users');

const createClient = async (req, res) => {
  try {
    const client = await User.create(req.body);
    res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: client
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add client" });
  }
};

const editClient = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.body.id }
    });
    if (updated) {
      const updatedClient = await User.findOne({ where: { id: req.body.id } });
      res.status(200).json({
        success: true,
        message: "Client updated successfully",
        data: updatedClient
      });
    } else {
      res.status(404).json({ success: false, message: "Client not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to edit client" });
  }
};

const deleteClient = async (req, res) => {
  try {
    const clientId = req.body.id;
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

const getAllClients = async (req, res) => {
  try {
    const clients = await User.findAll({
      where: {
        role_id: 3
      }
    });
    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ error: "Failed to list clients" });
  }
};

module.exports = { createClient, editClient, deleteClient, getAllClients };