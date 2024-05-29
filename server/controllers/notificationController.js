const Notifications = require('../models/Notifications');

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notifications.findAll({
      where: {
        subdomain_id: req.body.subdomain_id,
        client_id: req.body.client_id
      },
      order: [["date", "DESC"]]
    });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ error: "Failed to list notifications" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.body.id;
    const deleted = await Notifications.destroy({
      where: { id: notificationId }
    });
    if (deleted) {
      res.status(200).json({ success: true, message: "Notification deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Notification not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Notification" });
  }
};

module.exports = { getAllNotifications, deleteNotification };