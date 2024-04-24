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

const getService = async (req, res) => {
  const id = req.body.id;
  console.log(id);

  try {
    const service = await Packages.findOne({
      where: { id: id },
    });
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ error: "Failed to get service" });
    console.log(error);
  }
};

const createService = async (req, res) => {
  let data = req.body;
  let isVideo = req.body.is_video === "true" ? 1 : 0;
  let subdomainId = Number(req.body.subdomain_id);
  let packagePrice = Number(req.body.package_price);

  data.is_video = isVideo;
  data.subdomain_id = subdomainId;
  data.package_price = packagePrice;
  console.log(data);
  try {
    const service = await Packages.create(req.body);
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ error: "Failed to create service" });
  }
};



module.exports = { getAllServices, getService, createService };
