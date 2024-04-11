const Packages = require('../models/Packages');

const getAllServices = async (req, res) => {
  try {
    const services = await Packages.findAll({
      where: {
        package_type: 'SERVICE'
      },
      order: [
        ['id', 'DESC']
      ]
    });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ error: "Failed to list services" });
  }
};

module.exports = { getAllServices };