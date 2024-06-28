const User = require('../models/Users');
const BusinessClients = require('../models/BusinessClients');
const Booking = require('../models/Booking');
const Collections = require('../models/Collections');
const Package = require('../models/Packages');

const getAllPhotographerAdmins = async (req, res) => {
  try {
    let photographerAdmins = await User.findAll({
      where: {
        role_id: 5
      },
      order: [['created', 'DESC']]
    });
    res.status(200).json({ success: true, data: photographerAdmins });

  } catch (error) {
    res.status(500).json({ error: "Failed to list photographer admins" });
  }
};

const updatePhotographerAdmin = async (req, res) => {
  try {
    let imageName = req.files && req.files.profile_photo.name;
    let data = {
      name: req.body.name,
      phone: req.body.phone,
      business_name: req.body.business_name,
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
    let admin;
    if (req.body.id) {
      admin = await User.findOne({ where: { id: req.body.id } });
      if (!admin) {
        return res.status(404).json({ error: 'photographer admin not found' });
      }
      // Update admin
      await admin.update(data);
      res.status(200).json({
        success: true,
        message: "Updated successfully."
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update photographer admin" });
  }
};

const getPhotographerAdmin = async (req, res) => {
  try {
    const data = await User.findOne({ where: { id: req.body.id } });
    const clientsAndPhotographers = await BusinessClients.findAll({
      where: { business_id: req.body.id },
      attributes: ['client_id']
    });
    const clientAndPhotographerIds = clientsAndPhotographers.map(cp => cp.client_id);
    const totalClients = await User.count({
      where: {
        id: clientAndPhotographerIds,
        role_id: 3
      }
    });
    const totalPhotographers = await User.count({
      where: {
        id: clientAndPhotographerIds,
        role_id: 2
      }
    });
    const totalBookings = await Booking.count({
      where: {
        subdomain_id: req.body.id
      }
    });
    const totalGalleries = await Collections.count({
      where: {
        subdomain_id: req.body.id
      }
    });
    res.status(200).json({ success: true, data: data, totalClients, totalPhotographers, totalBookings, totalGalleries });
  } catch (error) {
    res.status(500).json({ error: "Failed to data of photographer admin" });
  }
};

const deletePhotographerAdmin = async (req, res) => {
  try {
    const adminId = req.body.id;
    const admin = await User.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ success: false, message: "photographer admin not found" });
    }
    await User.update({ status: 'Deleted', deleted_at: new Date() }, { where: { id: adminId } });
    res.status(200).json({ success: true, message: "Action successful. Record will be removed permanently after 30 days." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update photographer admin status" });
  }
};

const updateStatusPhotographerAdmin = async (req, res) => {
  try {

    // let admin;
    // if (req.body.id) {
    //   admin = await User.findOne({ where: { id: req.body.id } });
    //   if (!admin) {
    //     return res.status(404).json({ error: 'photographer admin not found' });
    //   }
    //   // Update admin
    //   await admin.update(data);
    //   res.status(200).json({
    //     success: true,
    //     message: "Updated successfully."
    //   });
    // }

    const photographerAdmin = await User.findOne({ where: { id: req.body.id } });
    if (!photographerAdmin) {
      return res.status(404).json({ success: false, message: 'Photographer admin not found' });
    }
    photographerAdmin.status = req.body.status;
    await photographerAdmin.save();
    res.status(200).json({
      success: true,
      message: "Updated successfully."
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update photographer admin" });
  }
};

const unsubGoogleCalendar = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.body.id },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    await user.update({ calendar_sub: 0 });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to unsubscribe the user from Google Calendar." });
  }
};

const unsubDropbox = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.body.id },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    await user.update({ dropbox_refresh: null, dropbox_access: null, dropbox_id: null });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to unsubscribe the user from Dropbox." });
  }
};

const unsubQuickbooks = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.body.id },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const updatedUser = await user.update({ quickbooks_access_token: null, quickbooks_refresh_token: null, quickbooks_realm_id: null, quickbooks_customer_id: null, quickbooks_income_account_id: null, quickbooks_expense_account_id: null, quickbooks_asset_account_id: null });
    const items = await Package.findAll({
      where: { subdomain_id: req.body.id },
    });
    const updatedItems = await Promise.all(items.map(async (item) => {
      return await item.update({ quickbooks_item_id: null });
    }));
    res.status(200).json({ success: true, updatedUser: updatedUser, updatedItems: updatedItems });
  } catch (error) {
    res.status(500).json({ error: "Failed to unsubscribe the user from Dropbox." });
  }
};

module.exports = { getAllPhotographerAdmins, updatePhotographerAdmin, getPhotographerAdmin, deletePhotographerAdmin, updateStatusPhotographerAdmin, unsubGoogleCalendar, unsubDropbox, unsubQuickbooks };