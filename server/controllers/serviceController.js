const Packages = require("../models/Packages");

const getAllServices = async (req, res) => {
  const subdomainId = req.body.subdomain_id;
  const roleId = req.body.role_id;
  try {
    if (roleId != 3) {
      const services = await Packages.findAll({
        where: {
          package_type: "SERVICE",
          subdomain_id: subdomainId,
        },
        order: [["id", "DESC"]],
      });
      res.status(200).json({ success: true, data: services });
    } else {
      const services = await Packages.findAll({
        where: {
          package_type: "SERVICE",
          subdomain_id: subdomainId,
          status: "Active",
        },
        order: [["id", "DESC"]],
      });
      res.status(200).json({ success: true, data: services });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to list services" });
  }
};

module.exports = { getAllServices };
